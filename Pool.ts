import assertExists from "./assertExists";
import assertState from "./assertState";
import describeType from "./describeType";
import LinkedList, { LinkedListNode } from "./LinkedList";

type PoolItemState<T> = {
  available: boolean;
  node: LinkedListNode<T>;
};

// FIFO pool: the oldest available will be repeatedly returned until marked unavailable.
export default class Pool<T> {
  private readonly available = new LinkedList<T>();
  private readonly unavailable = new LinkedList<T>();
  // In case items are in multiple Pool instances.
  private readonly itemStatePropSymbol = Symbol("kPoolItemState");

  private getStateOfItem(item: T): PoolItemState<T> {
    return assertExists(
      (item as any)[this.itemStatePropSymbol],
      "Item was never registered in this pool"
    );
  }

  getAvailable() {
    return this.available.getHead()?.getValue();
  }

  makeAvailable(item: T) {
    const state = this.getStateOfItem(item);
    if (!state.available) {
      state.available = true;
      state.node.detach();
      state.node = this.available.append(item);
    }
  }

  makeUnavailable(item: T) {
    const state = this.getStateOfItem(item);
    if (state.available) {
      state.available = false;
      state.node.detach();
      state.node = this.unavailable.append(item);
    }
  }

  registerNewItem(item_: T) {
    const item = item_ as any;
    assertState(
      !!item && typeof item == "object",
      `Pools can only take objects (got ${describeType(item)})`
    );
    assertState(
      !(this.itemStatePropSymbol in item),
      `Item has already been registered`
    );
    const node = this.available.append(item);
    const state: PoolItemState<T> = {
      node,
      available: true,
    };
    item[this.itemStatePropSymbol] = state;
  }

  deregisterItem(item_: T) {
    const item = item_ as any;
    if (this.itemStatePropSymbol in item) {
      const state = this.getStateOfItem(item);
      state.node.detach();
      delete item[this.itemStatePropSymbol];
    }
  }
}
