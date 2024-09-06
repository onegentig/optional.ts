import { OptionalAccessError } from './optional-error.js';

/**
 * @brief Class that representing a value that may or may not be there.
 * @details Inspired (essentually plagiarised) by C++ `std::optional` class
 *          that works in a similar way (adjusted for what JS can do).
 * @see https://en.cppreference.com/w/cpp/utility/optional
 * @author onegen <https://github.com/onegentig>
 * @date 2024-09-05
 * @version 0.1.0
 */
export class Optional<T> {
     /** @brief The value that may or may not be here. */
     private _value: T | null;

     /** @brief Constructs an optional object */
     constructor (value?: T | null) {
          this._value = value ?? null;
     }

     /**
      * @brief Creates an optional object with no value.
      * @see https://en.cppreference.com/w/cpp/utility/optional/nullopt
      */
     public static none<T> (): Optional<T> {
          return new Optional<T>(null);
     }

     /**
      * @brief Creates an optional object with a value.
      * @param value The value
      */
     public static some<T> (value: T): Optional<T> {
          return new Optional<T>(value);
     }

     /** @brief Removes the contained value */
     public reset (): void {
          this._value = null;
     }

     /**
      * @brief Checks whether the object contains a value
      * @returns `true` if contains value, `false` otherwise
      */
     public hasValue (): boolean {
          return this._value !== null;
     }

     /**
      * @brief Returns the contained value
      * @returns The value
      * @throws {@link OptionalAccessError} if there is no value
      */
     public value (): T {
          if (this._value === null)
               throw new OptionalAccessError(
                    'Optional object does not contain a value'
               );
          return this._value;
     }

     /**
      * @brief Returns the contained value if available,
      *        another value otherwise
      * @param defaultValue Value to return if there is no value
      * @returns The value if available, `default` otherwise
      */
     public valueOr (defaultValue: T) {
          return this._value ?? defaultValue;
     }
}

/* Some re-exports for convenience */

export const none: Optional<any> = Optional.none();
export const some = Optional.some;
