import { OptionalAccessError } from "./optional-error";

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
     private v: T | null;

     /** @brief Constructs an optional object */
     constructor(value?: T | null) {
          this.v = value || null;
     }

     /**
      * @brief Creates an optional object with no value.
      * @see https://en.cppreference.com/w/cpp/utility/optional/nullopt
      */
     public static none<T>(): Optional<T> {
          return new Optional<T>(null);
     }

     /**
      * @brief Creates an optional object with a value.
      * @param value The value
      */
     public static some<T>(value: T): Optional<T> {
          return new Optional<T>(value);
     }

     /**
      * @brief Checks whether the object contains a value
      * @returns `true` if contains value, `false` otherwise
      */
     public has_value(): boolean {
          return this.v !== null;
     }

     /**
      * @brief Returns the contained value
      * @returns The value
      * @throws {@link OptionalAccessError} if there is no value
      */
     public value(): T {
          if (this.v === null)
               throw new OptionalAccessError('Optional object does not contain a value');
          return this.v;
     }

     /**
      * @brief Returns the contained value if available,
      *        another value otherwise
      * @param defaultValue Value to return if there is no value
      * @returns The value if available, `default` otherwise
      */
     public value_or(defaultValue: T) {
          return this.v === null ? defaultValue : this.v;
     }
}

/* Some re-exports for convenience */

export const none = Optional.none();
export const some = Optional.some;
