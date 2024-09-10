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

     public static nullopt: Optional<any> = Optional.none(); // C++ shorthand

     /**
      * @brief Creates an optional object with a value.
      * @param value The value
      */
     public static some<T> (value: T): Optional<T> {
          return new Optional<T>(value);
     }

     /* == Observers == */

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
                    'Optional object does not contain a value',
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

     /* == Modifiers == */

     /**
      * @brief Removes the contained value
      * @returns The optional object itself
      */
     public reset (): Optional<T> {
          this._value = null;
          return this;
     }

     /**
      * @brief Assigns a new value to the object
      * @param value The new value
      * @note This is a deviation from `std::optional`, but a compromise
      *       for the fact that JS/TS does not allow operator overloading.
      */
     public assign (value: T): Optional<T> {
          this._value = value;
          return this;
     }

     /**
      * @brief Swaps the contained value with another optional object
      * @param other Other optional object
      * @returns The optional object itself
      */
     public swap (other: Optional<T>): Optional<T> {
          [ this._value, other._value ] = [ other._value, this._value ];
          return this;
     }

     /* == Monadic operations == */

     /**
      * @brief Calls the given Optional-returning function if there is a value
      *        and returns its result; if there is no value,
      *        returns Option.none().
      * @param fn Function to invoke (must return Optional<*>)
      * @returns Optional result of the function or nullopt
      */
     public andThen<U> (fn: (value: T) => Optional<U>): Optional<U> {
          if (this._value === null) return Optional.none<U>();
          return fn(this._value);
     }

     /**
      * @brief Calls the given function if there is a value
      *        and returns the result wrapped in an Optional<>;
      *        if there is no value, returns Option.none().
      * @param fn Function to invoke
      * @returns Optional result of the function or nullopt
      */
     public transform<U> (fn: (value: T) => U): Optional<U> {
          if (this._value === null) return Optional.none<U>();
          return Optional.some(fn(this._value));
     }

     /**
      * @brief Calls the given Optional-returning function if there is NO value
      *        and returns the result wrapped in an Optional<>;
      *        if there is a value, returns self.
      * @param fn Function to invoke (must return Optional<*>)
      * @returns Optional result of the function or Optional self
      */
     public orElse (fn: () => Optional<T>): Optional<T> {
          if (this._value === null) return fn();
          return this;
     }
}

/* Some re-exports for convenience */

export const some = Optional.some;
export const none = Optional.none;
export const nullopt = Optional.nullopt;
