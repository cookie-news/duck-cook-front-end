export class ServiceError extends Error {
  constructor(addr: string) {
    super("Error when trying to communicate with the address:" + addr);
  }
}
