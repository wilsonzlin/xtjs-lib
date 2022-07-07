import assertState from "./assertState";

enum NodeType {
  DummyHead,
  DummyTail,
  List,
}

// We'd prefer to use symbol properties but unfortunately TS doesn't narrow union types when using symbols.
type DummyHeadNode<T> = {
  next: ValueNode<T> | DummyTailNode<T>;
  type: NodeType.DummyHead;
};

type DummyTailNode<T> = {
  prev: ValueNode<T> | DummyHeadNode<T>;
  type: NodeType.DummyTail;
};

class ValueNode<T> {
  private detached = false;

  prev: ValueNode<T> | DummyHeadNode<T>;
  next: ValueNode<T> | DummyTailNode<T>;
  type: NodeType.List = NodeType.List;

  constructor(
    prev: ValueNode<T> | DummyHeadNode<T>,
    next: ValueNode<T> | DummyTailNode<T>,
    private value: T
  ) {
    [prev.next, this.prev] = [this, prev];
    [next.prev, this.next] = [this, next];
  }

  detach(): void {
    assertState(!this.detached);
    this.detached = true;
    this.prev.next = this.next;
    this.next.prev = this.prev;
  }

  getPrev(): ValueNode<T> | undefined {
    assertState(!this.detached);
    const n = this.prev;
    return n.type == NodeType.List ? n : undefined;
  }

  getNext(): ValueNode<T> | undefined {
    assertState(!this.detached);
    const n = this.next;
    return n.type == NodeType.List ? n : undefined;
  }

  getValue(): T {
    return this.value;
  }

  setValue(v: T): void {
    this.value = v;
  }
}

export declare type LinkedListNode<T> = Omit<
  ValueNode<T>,
  "prev" | "next" | "type"
>;
export const LinkedListNode = ValueNode;

function assertIsValueNode<T>(
  n: DummyTailNode<T> | ValueNode<T>
): asserts n is ValueNode<T> {
  assertState(
    n.type === NodeType.List,
    `LinkedList node is of type ${n.type} (expected NodeType.List)`
  );
}

export default class LinkedList<T> implements Iterable<T> {
  // For simplicity, use dummy nodes.
  private head: DummyHeadNode<T>;
  private tail: DummyTailNode<T>;

  constructor() {
    this.head = { type: NodeType.DummyHead } as any;
    this.tail = { type: NodeType.DummyTail } as any;
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  *[Symbol.iterator]() {
    let n = this.head.next;
    while (n !== this.tail) {
      assertIsValueNode(n);
      yield n.getValue();
      n = n.next;
    }
  }

  isEmpty() {
    return !this.getHead();
  }

  append(val: T): ValueNode<T> {
    const n = new ValueNode(this.tail.prev, this.tail, val);
    return n;
  }

  prepend(val: T): ValueNode<T> {
    const n = new ValueNode(this.head, this.head.next, val);
    return n;
  }

  getHead(): ValueNode<T> | undefined {
    const n = this.head.next;
    return n.type == NodeType.List ? n : undefined;
  }

  getTail(): ValueNode<T> | undefined {
    const n = this.tail.prev;
    return n.type == NodeType.List ? n : undefined;
  }
}
