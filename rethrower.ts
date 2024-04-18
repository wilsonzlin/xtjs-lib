// The errorProvider can return any falsy value to throw original error. This allows for concise conditional rethrowing e.g. `db.query().catch(rethrower(e => e instanceof NoRowsError && new UserNotFoundError()))`;
export default <I>(
    errorProvider: (e: I) => Error | null | undefined | 0 | 0n | "" | false
  ) =>
  (e: I) => {
    throw errorProvider(e) || e;
  };
