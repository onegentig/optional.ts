import type { Optional } from './optional.js';

/**
 * @brief Error thrown by {@link Optional.value} when accessing
 *        an optional object that does not contain a value.
 * @author onegen <https://github.com/onegentig>
 * @date 2024-09-05
 */
export class OptionalAccessError extends Error {
     constructor (message: string) {
          super(message);
          this.name = 'OptionalAccessError';
     }
}
