// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Doain {
  /**
   * configurable
   */
  export interface FetchResponse<T = any> {
    data: T;
    message: string;
    status: number;
  }
}
