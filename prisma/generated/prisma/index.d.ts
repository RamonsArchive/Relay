
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Cart
 * 
 */
export type Cart = $Result.DefaultSelection<Prisma.$CartPayload>
/**
 * Model CartItem
 * 
 */
export type CartItem = $Result.DefaultSelection<Prisma.$CartItemPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model Variant
 * 
 */
export type Variant = $Result.DefaultSelection<Prisma.$VariantPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Address
 * 
 */
export type Address = $Result.DefaultSelection<Prisma.$AddressPayload>
/**
 * Model CheckoutSession
 * 
 */
export type CheckoutSession = $Result.DefaultSelection<Prisma.$CheckoutSessionPayload>
/**
 * Model SanitySync
 * 
 */
export type SanitySync = $Result.DefaultSelection<Prisma.$SanitySyncPayload>
/**
 * Model PromoCode
 * 
 */
export type PromoCode = $Result.DefaultSelection<Prisma.$PromoCodePayload>
/**
 * Model PromoCodeUsage
 * 
 */
export type PromoCodeUsage = $Result.DefaultSelection<Prisma.$PromoCodeUsagePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cart`: Exposes CRUD operations for the **Cart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Carts
    * const carts = await prisma.cart.findMany()
    * ```
    */
  get cart(): Prisma.CartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cartItem`: Exposes CRUD operations for the **CartItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CartItems
    * const cartItems = await prisma.cartItem.findMany()
    * ```
    */
  get cartItem(): Prisma.CartItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.variant`: Exposes CRUD operations for the **Variant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Variants
    * const variants = await prisma.variant.findMany()
    * ```
    */
  get variant(): Prisma.VariantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): Prisma.AddressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.checkoutSession`: Exposes CRUD operations for the **CheckoutSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CheckoutSessions
    * const checkoutSessions = await prisma.checkoutSession.findMany()
    * ```
    */
  get checkoutSession(): Prisma.CheckoutSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sanitySync`: Exposes CRUD operations for the **SanitySync** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SanitySyncs
    * const sanitySyncs = await prisma.sanitySync.findMany()
    * ```
    */
  get sanitySync(): Prisma.SanitySyncDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.promoCode`: Exposes CRUD operations for the **PromoCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PromoCodes
    * const promoCodes = await prisma.promoCode.findMany()
    * ```
    */
  get promoCode(): Prisma.PromoCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.promoCodeUsage`: Exposes CRUD operations for the **PromoCodeUsage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PromoCodeUsages
    * const promoCodeUsages = await prisma.promoCodeUsage.findMany()
    * ```
    */
  get promoCodeUsage(): Prisma.PromoCodeUsageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Cart: 'Cart',
    CartItem: 'CartItem',
    Order: 'Order',
    OrderItem: 'OrderItem',
    Variant: 'Variant',
    Product: 'Product',
    Address: 'Address',
    CheckoutSession: 'CheckoutSession',
    SanitySync: 'SanitySync',
    PromoCode: 'PromoCode',
    PromoCodeUsage: 'PromoCodeUsage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "cart" | "cartItem" | "order" | "orderItem" | "variant" | "product" | "address" | "checkoutSession" | "sanitySync" | "promoCode" | "promoCodeUsage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Cart: {
        payload: Prisma.$CartPayload<ExtArgs>
        fields: Prisma.CartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          findFirst: {
            args: Prisma.CartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          findMany: {
            args: Prisma.CartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>[]
          }
          create: {
            args: Prisma.CartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          createMany: {
            args: Prisma.CartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          update: {
            args: Prisma.CartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          deleteMany: {
            args: Prisma.CartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          aggregate: {
            args: Prisma.CartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCart>
          }
          groupBy: {
            args: Prisma.CartGroupByArgs<ExtArgs>
            result: $Utils.Optional<CartGroupByOutputType>[]
          }
          count: {
            args: Prisma.CartCountArgs<ExtArgs>
            result: $Utils.Optional<CartCountAggregateOutputType> | number
          }
        }
      }
      CartItem: {
        payload: Prisma.$CartItemPayload<ExtArgs>
        fields: Prisma.CartItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CartItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CartItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          findFirst: {
            args: Prisma.CartItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CartItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          findMany: {
            args: Prisma.CartItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>[]
          }
          create: {
            args: Prisma.CartItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          createMany: {
            args: Prisma.CartItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CartItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          update: {
            args: Prisma.CartItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          deleteMany: {
            args: Prisma.CartItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CartItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CartItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          aggregate: {
            args: Prisma.CartItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCartItem>
          }
          groupBy: {
            args: Prisma.CartItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<CartItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.CartItemCountArgs<ExtArgs>
            result: $Utils.Optional<CartItemCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      Variant: {
        payload: Prisma.$VariantPayload<ExtArgs>
        fields: Prisma.VariantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VariantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VariantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          findFirst: {
            args: Prisma.VariantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VariantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          findMany: {
            args: Prisma.VariantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>[]
          }
          create: {
            args: Prisma.VariantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          createMany: {
            args: Prisma.VariantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VariantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          update: {
            args: Prisma.VariantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          deleteMany: {
            args: Prisma.VariantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VariantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VariantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          aggregate: {
            args: Prisma.VariantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVariant>
          }
          groupBy: {
            args: Prisma.VariantGroupByArgs<ExtArgs>
            result: $Utils.Optional<VariantGroupByOutputType>[]
          }
          count: {
            args: Prisma.VariantCountArgs<ExtArgs>
            result: $Utils.Optional<VariantCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Address: {
        payload: Prisma.$AddressPayload<ExtArgs>
        fields: Prisma.AddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findFirst: {
            args: Prisma.AddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findMany: {
            args: Prisma.AddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          create: {
            args: Prisma.AddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          createMany: {
            args: Prisma.AddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          update: {
            args: Prisma.AddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          deleteMany: {
            args: Prisma.AddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          aggregate: {
            args: Prisma.AddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddress>
          }
          groupBy: {
            args: Prisma.AddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressCountArgs<ExtArgs>
            result: $Utils.Optional<AddressCountAggregateOutputType> | number
          }
        }
      }
      CheckoutSession: {
        payload: Prisma.$CheckoutSessionPayload<ExtArgs>
        fields: Prisma.CheckoutSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CheckoutSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CheckoutSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>
          }
          findFirst: {
            args: Prisma.CheckoutSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CheckoutSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>
          }
          findMany: {
            args: Prisma.CheckoutSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>[]
          }
          create: {
            args: Prisma.CheckoutSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>
          }
          createMany: {
            args: Prisma.CheckoutSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CheckoutSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>
          }
          update: {
            args: Prisma.CheckoutSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>
          }
          deleteMany: {
            args: Prisma.CheckoutSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CheckoutSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CheckoutSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>
          }
          aggregate: {
            args: Prisma.CheckoutSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCheckoutSession>
          }
          groupBy: {
            args: Prisma.CheckoutSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CheckoutSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CheckoutSessionCountArgs<ExtArgs>
            result: $Utils.Optional<CheckoutSessionCountAggregateOutputType> | number
          }
        }
      }
      SanitySync: {
        payload: Prisma.$SanitySyncPayload<ExtArgs>
        fields: Prisma.SanitySyncFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SanitySyncFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitySyncPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SanitySyncFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitySyncPayload>
          }
          findFirst: {
            args: Prisma.SanitySyncFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitySyncPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SanitySyncFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitySyncPayload>
          }
          findMany: {
            args: Prisma.SanitySyncFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitySyncPayload>[]
          }
          create: {
            args: Prisma.SanitySyncCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitySyncPayload>
          }
          createMany: {
            args: Prisma.SanitySyncCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SanitySyncDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitySyncPayload>
          }
          update: {
            args: Prisma.SanitySyncUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitySyncPayload>
          }
          deleteMany: {
            args: Prisma.SanitySyncDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SanitySyncUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SanitySyncUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanitySyncPayload>
          }
          aggregate: {
            args: Prisma.SanitySyncAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSanitySync>
          }
          groupBy: {
            args: Prisma.SanitySyncGroupByArgs<ExtArgs>
            result: $Utils.Optional<SanitySyncGroupByOutputType>[]
          }
          count: {
            args: Prisma.SanitySyncCountArgs<ExtArgs>
            result: $Utils.Optional<SanitySyncCountAggregateOutputType> | number
          }
        }
      }
      PromoCode: {
        payload: Prisma.$PromoCodePayload<ExtArgs>
        fields: Prisma.PromoCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PromoCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PromoCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          findFirst: {
            args: Prisma.PromoCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PromoCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          findMany: {
            args: Prisma.PromoCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>[]
          }
          create: {
            args: Prisma.PromoCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          createMany: {
            args: Prisma.PromoCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PromoCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          update: {
            args: Prisma.PromoCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          deleteMany: {
            args: Prisma.PromoCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PromoCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PromoCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodePayload>
          }
          aggregate: {
            args: Prisma.PromoCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePromoCode>
          }
          groupBy: {
            args: Prisma.PromoCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromoCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.PromoCodeCountArgs<ExtArgs>
            result: $Utils.Optional<PromoCodeCountAggregateOutputType> | number
          }
        }
      }
      PromoCodeUsage: {
        payload: Prisma.$PromoCodeUsagePayload<ExtArgs>
        fields: Prisma.PromoCodeUsageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PromoCodeUsageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PromoCodeUsageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsagePayload>
          }
          findFirst: {
            args: Prisma.PromoCodeUsageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PromoCodeUsageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsagePayload>
          }
          findMany: {
            args: Prisma.PromoCodeUsageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsagePayload>[]
          }
          create: {
            args: Prisma.PromoCodeUsageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsagePayload>
          }
          createMany: {
            args: Prisma.PromoCodeUsageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PromoCodeUsageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsagePayload>
          }
          update: {
            args: Prisma.PromoCodeUsageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsagePayload>
          }
          deleteMany: {
            args: Prisma.PromoCodeUsageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PromoCodeUsageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PromoCodeUsageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoCodeUsagePayload>
          }
          aggregate: {
            args: Prisma.PromoCodeUsageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePromoCodeUsage>
          }
          groupBy: {
            args: Prisma.PromoCodeUsageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromoCodeUsageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PromoCodeUsageCountArgs<ExtArgs>
            result: $Utils.Optional<PromoCodeUsageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    cart?: CartOmit
    cartItem?: CartItemOmit
    order?: OrderOmit
    orderItem?: OrderItemOmit
    variant?: VariantOmit
    product?: ProductOmit
    address?: AddressOmit
    checkoutSession?: CheckoutSessionOmit
    sanitySync?: SanitySyncOmit
    promoCode?: PromoCodeOmit
    promoCodeUsage?: PromoCodeUsageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    orders: number
    addresses: number
    promoUsages: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | UserCountOutputTypeCountOrdersArgs
    addresses?: boolean | UserCountOutputTypeCountAddressesArgs
    promoUsages?: boolean | UserCountOutputTypeCountPromoUsagesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPromoUsagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoCodeUsageWhereInput
  }


  /**
   * Count Type CartCountOutputType
   */

  export type CartCountOutputType = {
    items: number
    checkoutSessions: number
  }

  export type CartCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | CartCountOutputTypeCountItemsArgs
    checkoutSessions?: boolean | CartCountOutputTypeCountCheckoutSessionsArgs
  }

  // Custom InputTypes
  /**
   * CartCountOutputType without action
   */
  export type CartCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartCountOutputType
     */
    select?: CartCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CartCountOutputType without action
   */
  export type CartCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartItemWhereInput
  }

  /**
   * CartCountOutputType without action
   */
  export type CartCountOutputTypeCountCheckoutSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CheckoutSessionWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    promoUsages: number
    items: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promoUsages?: boolean | OrderCountOutputTypeCountPromoUsagesArgs
    items?: boolean | OrderCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountPromoUsagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoCodeUsageWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type VariantCountOutputType
   */

  export type VariantCountOutputType = {
    cartItems: number
    orderItems: number
  }

  export type VariantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cartItems?: boolean | VariantCountOutputTypeCountCartItemsArgs
    orderItems?: boolean | VariantCountOutputTypeCountOrderItemsArgs
  }

  // Custom InputTypes
  /**
   * VariantCountOutputType without action
   */
  export type VariantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VariantCountOutputType
     */
    select?: VariantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VariantCountOutputType without action
   */
  export type VariantCountOutputTypeCountCartItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartItemWhereInput
  }

  /**
   * VariantCountOutputType without action
   */
  export type VariantCountOutputTypeCountOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    variants: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variants?: boolean | ProductCountOutputTypeCountVariantsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountVariantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VariantWhereInput
  }


  /**
   * Count Type AddressCountOutputType
   */

  export type AddressCountOutputType = {
    orders: number
    carts: number
  }

  export type AddressCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | AddressCountOutputTypeCountOrdersArgs
    carts?: boolean | AddressCountOutputTypeCountCartsArgs
  }

  // Custom InputTypes
  /**
   * AddressCountOutputType without action
   */
  export type AddressCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressCountOutputType
     */
    select?: AddressCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AddressCountOutputType without action
   */
  export type AddressCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * AddressCountOutputType without action
   */
  export type AddressCountOutputTypeCountCartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartWhereInput
  }


  /**
   * Count Type PromoCodeCountOutputType
   */

  export type PromoCodeCountOutputType = {
    carts: number
    orders: number
    userUsages: number
  }

  export type PromoCodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carts?: boolean | PromoCodeCountOutputTypeCountCartsArgs
    orders?: boolean | PromoCodeCountOutputTypeCountOrdersArgs
    userUsages?: boolean | PromoCodeCountOutputTypeCountUserUsagesArgs
  }

  // Custom InputTypes
  /**
   * PromoCodeCountOutputType without action
   */
  export type PromoCodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeCountOutputType
     */
    select?: PromoCodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PromoCodeCountOutputType without action
   */
  export type PromoCodeCountOutputTypeCountCartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartWhereInput
  }

  /**
   * PromoCodeCountOutputType without action
   */
  export type PromoCodeCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * PromoCodeCountOutputType without action
   */
  export type PromoCodeCountOutputTypeCountUserUsagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoCodeUsageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    provider: string | null
    stripeCustomerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    provider: string | null
    stripeCustomerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    provider: number
    stripeCustomerId: number
    createdAt: number
    updatedAt: number
    isActive: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    provider?: true
    stripeCustomerId?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    provider?: true
    stripeCustomerId?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    provider?: true
    stripeCustomerId?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    provider: string | null
    stripeCustomerId: string | null
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    provider?: boolean
    stripeCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    cart?: boolean | User$cartArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    addresses?: boolean | User$addressesArgs<ExtArgs>
    promoUsages?: boolean | User$promoUsagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    provider?: boolean
    stripeCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "provider" | "stripeCustomerId" | "createdAt" | "updatedAt" | "isActive", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cart?: boolean | User$cartArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    addresses?: boolean | User$addressesArgs<ExtArgs>
    promoUsages?: boolean | User$promoUsagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      cart: Prisma.$CartPayload<ExtArgs> | null
      orders: Prisma.$OrderPayload<ExtArgs>[]
      addresses: Prisma.$AddressPayload<ExtArgs>[]
      promoUsages: Prisma.$PromoCodeUsagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      provider: string | null
      stripeCustomerId: string | null
      createdAt: Date
      updatedAt: Date
      isActive: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cart<T extends User$cartArgs<ExtArgs> = {}>(args?: Subset<T, User$cartArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    orders<T extends User$ordersArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    addresses<T extends User$addressesArgs<ExtArgs> = {}>(args?: Subset<T, User$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    promoUsages<T extends User$promoUsagesArgs<ExtArgs> = {}>(args?: Subset<T, User$promoUsagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodeUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly provider: FieldRef<"User", 'String'>
    readonly stripeCustomerId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly isActive: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.cart
   */
  export type User$cartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    where?: CartWhereInput
  }

  /**
   * User.orders
   */
  export type User$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User.addresses
   */
  export type User$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * User.promoUsages
   */
  export type User$promoUsagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUsage
     */
    select?: PromoCodeUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUsage
     */
    omit?: PromoCodeUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUsageInclude<ExtArgs> | null
    where?: PromoCodeUsageWhereInput
    orderBy?: PromoCodeUsageOrderByWithRelationInput | PromoCodeUsageOrderByWithRelationInput[]
    cursor?: PromoCodeUsageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PromoCodeUsageScalarFieldEnum | PromoCodeUsageScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Cart
   */

  export type AggregateCart = {
    _count: CartCountAggregateOutputType | null
    _avg: CartAvgAggregateOutputType | null
    _sum: CartSumAggregateOutputType | null
    _min: CartMinAggregateOutputType | null
    _max: CartMaxAggregateOutputType | null
  }

  export type CartAvgAggregateOutputType = {
    id: number | null
    appliedPromoCodeId: number | null
    promoDiscountAmount: number | null
    shippingAddressId: number | null
  }

  export type CartSumAggregateOutputType = {
    id: number | null
    appliedPromoCodeId: number | null
    promoDiscountAmount: number | null
    shippingAddressId: number | null
  }

  export type CartMinAggregateOutputType = {
    id: number | null
    userId: string | null
    tempCartId: string | null
    appliedPromoCodeId: number | null
    promoDiscountAmount: number | null
    promoAppliedAt: Date | null
    requiresPromoVerification: boolean | null
    shippingMethod: string | null
    shippingAddressId: number | null
    stripeCheckoutSessionId: string | null
    checkoutStatus: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CartMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    tempCartId: string | null
    appliedPromoCodeId: number | null
    promoDiscountAmount: number | null
    promoAppliedAt: Date | null
    requiresPromoVerification: boolean | null
    shippingMethod: string | null
    shippingAddressId: number | null
    stripeCheckoutSessionId: string | null
    checkoutStatus: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CartCountAggregateOutputType = {
    id: number
    userId: number
    tempCartId: number
    appliedPromoCodeId: number
    promoDiscountAmount: number
    promoAppliedAt: number
    requiresPromoVerification: number
    shippingMethod: number
    shippingAddressId: number
    stripeCheckoutSessionId: number
    checkoutStatus: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CartAvgAggregateInputType = {
    id?: true
    appliedPromoCodeId?: true
    promoDiscountAmount?: true
    shippingAddressId?: true
  }

  export type CartSumAggregateInputType = {
    id?: true
    appliedPromoCodeId?: true
    promoDiscountAmount?: true
    shippingAddressId?: true
  }

  export type CartMinAggregateInputType = {
    id?: true
    userId?: true
    tempCartId?: true
    appliedPromoCodeId?: true
    promoDiscountAmount?: true
    promoAppliedAt?: true
    requiresPromoVerification?: true
    shippingMethod?: true
    shippingAddressId?: true
    stripeCheckoutSessionId?: true
    checkoutStatus?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CartMaxAggregateInputType = {
    id?: true
    userId?: true
    tempCartId?: true
    appliedPromoCodeId?: true
    promoDiscountAmount?: true
    promoAppliedAt?: true
    requiresPromoVerification?: true
    shippingMethod?: true
    shippingAddressId?: true
    stripeCheckoutSessionId?: true
    checkoutStatus?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CartCountAggregateInputType = {
    id?: true
    userId?: true
    tempCartId?: true
    appliedPromoCodeId?: true
    promoDiscountAmount?: true
    promoAppliedAt?: true
    requiresPromoVerification?: true
    shippingMethod?: true
    shippingAddressId?: true
    stripeCheckoutSessionId?: true
    checkoutStatus?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cart to aggregate.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Carts
    **/
    _count?: true | CartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CartMaxAggregateInputType
  }

  export type GetCartAggregateType<T extends CartAggregateArgs> = {
        [P in keyof T & keyof AggregateCart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCart[P]>
      : GetScalarType<T[P], AggregateCart[P]>
  }




  export type CartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartWhereInput
    orderBy?: CartOrderByWithAggregationInput | CartOrderByWithAggregationInput[]
    by: CartScalarFieldEnum[] | CartScalarFieldEnum
    having?: CartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CartCountAggregateInputType | true
    _avg?: CartAvgAggregateInputType
    _sum?: CartSumAggregateInputType
    _min?: CartMinAggregateInputType
    _max?: CartMaxAggregateInputType
  }

  export type CartGroupByOutputType = {
    id: number
    userId: string | null
    tempCartId: string | null
    appliedPromoCodeId: number | null
    promoDiscountAmount: number | null
    promoAppliedAt: Date | null
    requiresPromoVerification: boolean
    shippingMethod: string | null
    shippingAddressId: number | null
    stripeCheckoutSessionId: string | null
    checkoutStatus: string | null
    expiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: CartCountAggregateOutputType | null
    _avg: CartAvgAggregateOutputType | null
    _sum: CartSumAggregateOutputType | null
    _min: CartMinAggregateOutputType | null
    _max: CartMaxAggregateOutputType | null
  }

  type GetCartGroupByPayload<T extends CartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartGroupByOutputType[P]>
            : GetScalarType<T[P], CartGroupByOutputType[P]>
        }
      >
    >


  export type CartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tempCartId?: boolean
    appliedPromoCodeId?: boolean
    promoDiscountAmount?: boolean
    promoAppliedAt?: boolean
    requiresPromoVerification?: boolean
    shippingMethod?: boolean
    shippingAddressId?: boolean
    stripeCheckoutSessionId?: boolean
    checkoutStatus?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Cart$userArgs<ExtArgs>
    appliedPromoCode?: boolean | Cart$appliedPromoCodeArgs<ExtArgs>
    shippingAddress?: boolean | Cart$shippingAddressArgs<ExtArgs>
    items?: boolean | Cart$itemsArgs<ExtArgs>
    checkoutSessions?: boolean | Cart$checkoutSessionsArgs<ExtArgs>
    _count?: boolean | CartCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cart"]>



  export type CartSelectScalar = {
    id?: boolean
    userId?: boolean
    tempCartId?: boolean
    appliedPromoCodeId?: boolean
    promoDiscountAmount?: boolean
    promoAppliedAt?: boolean
    requiresPromoVerification?: boolean
    shippingMethod?: boolean
    shippingAddressId?: boolean
    stripeCheckoutSessionId?: boolean
    checkoutStatus?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "tempCartId" | "appliedPromoCodeId" | "promoDiscountAmount" | "promoAppliedAt" | "requiresPromoVerification" | "shippingMethod" | "shippingAddressId" | "stripeCheckoutSessionId" | "checkoutStatus" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["cart"]>
  export type CartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Cart$userArgs<ExtArgs>
    appliedPromoCode?: boolean | Cart$appliedPromoCodeArgs<ExtArgs>
    shippingAddress?: boolean | Cart$shippingAddressArgs<ExtArgs>
    items?: boolean | Cart$itemsArgs<ExtArgs>
    checkoutSessions?: boolean | Cart$checkoutSessionsArgs<ExtArgs>
    _count?: boolean | CartCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cart"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      appliedPromoCode: Prisma.$PromoCodePayload<ExtArgs> | null
      shippingAddress: Prisma.$AddressPayload<ExtArgs> | null
      items: Prisma.$CartItemPayload<ExtArgs>[]
      checkoutSessions: Prisma.$CheckoutSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string | null
      tempCartId: string | null
      appliedPromoCodeId: number | null
      promoDiscountAmount: number | null
      promoAppliedAt: Date | null
      requiresPromoVerification: boolean
      shippingMethod: string | null
      shippingAddressId: number | null
      stripeCheckoutSessionId: string | null
      checkoutStatus: string | null
      expiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cart"]>
    composites: {}
  }

  type CartGetPayload<S extends boolean | null | undefined | CartDefaultArgs> = $Result.GetResult<Prisma.$CartPayload, S>

  type CartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CartCountAggregateInputType | true
    }

  export interface CartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cart'], meta: { name: 'Cart' } }
    /**
     * Find zero or one Cart that matches the filter.
     * @param {CartFindUniqueArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CartFindUniqueArgs>(args: SelectSubset<T, CartFindUniqueArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CartFindUniqueOrThrowArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CartFindUniqueOrThrowArgs>(args: SelectSubset<T, CartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindFirstArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CartFindFirstArgs>(args?: SelectSubset<T, CartFindFirstArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindFirstOrThrowArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CartFindFirstOrThrowArgs>(args?: SelectSubset<T, CartFindFirstOrThrowArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Carts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Carts
     * const carts = await prisma.cart.findMany()
     * 
     * // Get first 10 Carts
     * const carts = await prisma.cart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cartWithIdOnly = await prisma.cart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CartFindManyArgs>(args?: SelectSubset<T, CartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cart.
     * @param {CartCreateArgs} args - Arguments to create a Cart.
     * @example
     * // Create one Cart
     * const Cart = await prisma.cart.create({
     *   data: {
     *     // ... data to create a Cart
     *   }
     * })
     * 
     */
    create<T extends CartCreateArgs>(args: SelectSubset<T, CartCreateArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Carts.
     * @param {CartCreateManyArgs} args - Arguments to create many Carts.
     * @example
     * // Create many Carts
     * const cart = await prisma.cart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CartCreateManyArgs>(args?: SelectSubset<T, CartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Cart.
     * @param {CartDeleteArgs} args - Arguments to delete one Cart.
     * @example
     * // Delete one Cart
     * const Cart = await prisma.cart.delete({
     *   where: {
     *     // ... filter to delete one Cart
     *   }
     * })
     * 
     */
    delete<T extends CartDeleteArgs>(args: SelectSubset<T, CartDeleteArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cart.
     * @param {CartUpdateArgs} args - Arguments to update one Cart.
     * @example
     * // Update one Cart
     * const cart = await prisma.cart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CartUpdateArgs>(args: SelectSubset<T, CartUpdateArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Carts.
     * @param {CartDeleteManyArgs} args - Arguments to filter Carts to delete.
     * @example
     * // Delete a few Carts
     * const { count } = await prisma.cart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CartDeleteManyArgs>(args?: SelectSubset<T, CartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Carts
     * const cart = await prisma.cart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CartUpdateManyArgs>(args: SelectSubset<T, CartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cart.
     * @param {CartUpsertArgs} args - Arguments to update or create a Cart.
     * @example
     * // Update or create a Cart
     * const cart = await prisma.cart.upsert({
     *   create: {
     *     // ... data to create a Cart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cart we want to update
     *   }
     * })
     */
    upsert<T extends CartUpsertArgs>(args: SelectSubset<T, CartUpsertArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Carts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartCountArgs} args - Arguments to filter Carts to count.
     * @example
     * // Count the number of Carts
     * const count = await prisma.cart.count({
     *   where: {
     *     // ... the filter for the Carts we want to count
     *   }
     * })
    **/
    count<T extends CartCountArgs>(
      args?: Subset<T, CartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CartAggregateArgs>(args: Subset<T, CartAggregateArgs>): Prisma.PrismaPromise<GetCartAggregateType<T>>

    /**
     * Group by Cart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartGroupByArgs['orderBy'] }
        : { orderBy?: CartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cart model
   */
  readonly fields: CartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Cart$userArgs<ExtArgs> = {}>(args?: Subset<T, Cart$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    appliedPromoCode<T extends Cart$appliedPromoCodeArgs<ExtArgs> = {}>(args?: Subset<T, Cart$appliedPromoCodeArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    shippingAddress<T extends Cart$shippingAddressArgs<ExtArgs> = {}>(args?: Subset<T, Cart$shippingAddressArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    items<T extends Cart$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Cart$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    checkoutSessions<T extends Cart$checkoutSessionsArgs<ExtArgs> = {}>(args?: Subset<T, Cart$checkoutSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cart model
   */
  interface CartFieldRefs {
    readonly id: FieldRef<"Cart", 'Int'>
    readonly userId: FieldRef<"Cart", 'String'>
    readonly tempCartId: FieldRef<"Cart", 'String'>
    readonly appliedPromoCodeId: FieldRef<"Cart", 'Int'>
    readonly promoDiscountAmount: FieldRef<"Cart", 'Int'>
    readonly promoAppliedAt: FieldRef<"Cart", 'DateTime'>
    readonly requiresPromoVerification: FieldRef<"Cart", 'Boolean'>
    readonly shippingMethod: FieldRef<"Cart", 'String'>
    readonly shippingAddressId: FieldRef<"Cart", 'Int'>
    readonly stripeCheckoutSessionId: FieldRef<"Cart", 'String'>
    readonly checkoutStatus: FieldRef<"Cart", 'String'>
    readonly expiresAt: FieldRef<"Cart", 'DateTime'>
    readonly createdAt: FieldRef<"Cart", 'DateTime'>
    readonly updatedAt: FieldRef<"Cart", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cart findUnique
   */
  export type CartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart findUniqueOrThrow
   */
  export type CartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart findFirst
   */
  export type CartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carts.
     */
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart findFirstOrThrow
   */
  export type CartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carts.
     */
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart findMany
   */
  export type CartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Carts to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart create
   */
  export type CartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The data needed to create a Cart.
     */
    data: XOR<CartCreateInput, CartUncheckedCreateInput>
  }

  /**
   * Cart createMany
   */
  export type CartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Carts.
     */
    data: CartCreateManyInput | CartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cart update
   */
  export type CartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The data needed to update a Cart.
     */
    data: XOR<CartUpdateInput, CartUncheckedUpdateInput>
    /**
     * Choose, which Cart to update.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart updateMany
   */
  export type CartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Carts.
     */
    data: XOR<CartUpdateManyMutationInput, CartUncheckedUpdateManyInput>
    /**
     * Filter which Carts to update
     */
    where?: CartWhereInput
    /**
     * Limit how many Carts to update.
     */
    limit?: number
  }

  /**
   * Cart upsert
   */
  export type CartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The filter to search for the Cart to update in case it exists.
     */
    where: CartWhereUniqueInput
    /**
     * In case the Cart found by the `where` argument doesn't exist, create a new Cart with this data.
     */
    create: XOR<CartCreateInput, CartUncheckedCreateInput>
    /**
     * In case the Cart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartUpdateInput, CartUncheckedUpdateInput>
  }

  /**
   * Cart delete
   */
  export type CartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter which Cart to delete.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart deleteMany
   */
  export type CartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Carts to delete
     */
    where?: CartWhereInput
    /**
     * Limit how many Carts to delete.
     */
    limit?: number
  }

  /**
   * Cart.user
   */
  export type Cart$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Cart.appliedPromoCode
   */
  export type Cart$appliedPromoCodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    where?: PromoCodeWhereInput
  }

  /**
   * Cart.shippingAddress
   */
  export type Cart$shippingAddressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
  }

  /**
   * Cart.items
   */
  export type Cart$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    where?: CartItemWhereInput
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    cursor?: CartItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * Cart.checkoutSessions
   */
  export type Cart$checkoutSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSession
     */
    omit?: CheckoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    where?: CheckoutSessionWhereInput
    orderBy?: CheckoutSessionOrderByWithRelationInput | CheckoutSessionOrderByWithRelationInput[]
    cursor?: CheckoutSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CheckoutSessionScalarFieldEnum | CheckoutSessionScalarFieldEnum[]
  }

  /**
   * Cart without action
   */
  export type CartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
  }


  /**
   * Model CartItem
   */

  export type AggregateCartItem = {
    _count: CartItemCountAggregateOutputType | null
    _avg: CartItemAvgAggregateOutputType | null
    _sum: CartItemSumAggregateOutputType | null
    _min: CartItemMinAggregateOutputType | null
    _max: CartItemMaxAggregateOutputType | null
  }

  export type CartItemAvgAggregateOutputType = {
    id: number | null
    cartId: number | null
    quantity: number | null
  }

  export type CartItemSumAggregateOutputType = {
    id: number | null
    cartId: number | null
    quantity: number | null
  }

  export type CartItemMinAggregateOutputType = {
    id: number | null
    cartId: number | null
    variantId: string | null
    quantity: number | null
    addedAt: Date | null
    updatedAt: Date | null
  }

  export type CartItemMaxAggregateOutputType = {
    id: number | null
    cartId: number | null
    variantId: string | null
    quantity: number | null
    addedAt: Date | null
    updatedAt: Date | null
  }

  export type CartItemCountAggregateOutputType = {
    id: number
    cartId: number
    variantId: number
    quantity: number
    addedAt: number
    updatedAt: number
    _all: number
  }


  export type CartItemAvgAggregateInputType = {
    id?: true
    cartId?: true
    quantity?: true
  }

  export type CartItemSumAggregateInputType = {
    id?: true
    cartId?: true
    quantity?: true
  }

  export type CartItemMinAggregateInputType = {
    id?: true
    cartId?: true
    variantId?: true
    quantity?: true
    addedAt?: true
    updatedAt?: true
  }

  export type CartItemMaxAggregateInputType = {
    id?: true
    cartId?: true
    variantId?: true
    quantity?: true
    addedAt?: true
    updatedAt?: true
  }

  export type CartItemCountAggregateInputType = {
    id?: true
    cartId?: true
    variantId?: true
    quantity?: true
    addedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CartItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartItem to aggregate.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CartItems
    **/
    _count?: true | CartItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CartItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CartItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CartItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CartItemMaxAggregateInputType
  }

  export type GetCartItemAggregateType<T extends CartItemAggregateArgs> = {
        [P in keyof T & keyof AggregateCartItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCartItem[P]>
      : GetScalarType<T[P], AggregateCartItem[P]>
  }




  export type CartItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartItemWhereInput
    orderBy?: CartItemOrderByWithAggregationInput | CartItemOrderByWithAggregationInput[]
    by: CartItemScalarFieldEnum[] | CartItemScalarFieldEnum
    having?: CartItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CartItemCountAggregateInputType | true
    _avg?: CartItemAvgAggregateInputType
    _sum?: CartItemSumAggregateInputType
    _min?: CartItemMinAggregateInputType
    _max?: CartItemMaxAggregateInputType
  }

  export type CartItemGroupByOutputType = {
    id: number
    cartId: number
    variantId: string
    quantity: number
    addedAt: Date
    updatedAt: Date
    _count: CartItemCountAggregateOutputType | null
    _avg: CartItemAvgAggregateOutputType | null
    _sum: CartItemSumAggregateOutputType | null
    _min: CartItemMinAggregateOutputType | null
    _max: CartItemMaxAggregateOutputType | null
  }

  type GetCartItemGroupByPayload<T extends CartItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CartItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CartItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartItemGroupByOutputType[P]>
            : GetScalarType<T[P], CartItemGroupByOutputType[P]>
        }
      >
    >


  export type CartItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cartId?: boolean
    variantId?: boolean
    quantity?: boolean
    addedAt?: boolean
    updatedAt?: boolean
    cart?: boolean | CartDefaultArgs<ExtArgs>
    variant?: boolean | VariantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cartItem"]>



  export type CartItemSelectScalar = {
    id?: boolean
    cartId?: boolean
    variantId?: boolean
    quantity?: boolean
    addedAt?: boolean
    updatedAt?: boolean
  }

  export type CartItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cartId" | "variantId" | "quantity" | "addedAt" | "updatedAt", ExtArgs["result"]["cartItem"]>
  export type CartItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cart?: boolean | CartDefaultArgs<ExtArgs>
    variant?: boolean | VariantDefaultArgs<ExtArgs>
  }

  export type $CartItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CartItem"
    objects: {
      cart: Prisma.$CartPayload<ExtArgs>
      variant: Prisma.$VariantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cartId: number
      variantId: string
      quantity: number
      addedAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cartItem"]>
    composites: {}
  }

  type CartItemGetPayload<S extends boolean | null | undefined | CartItemDefaultArgs> = $Result.GetResult<Prisma.$CartItemPayload, S>

  type CartItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CartItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CartItemCountAggregateInputType | true
    }

  export interface CartItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CartItem'], meta: { name: 'CartItem' } }
    /**
     * Find zero or one CartItem that matches the filter.
     * @param {CartItemFindUniqueArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CartItemFindUniqueArgs>(args: SelectSubset<T, CartItemFindUniqueArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CartItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CartItemFindUniqueOrThrowArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CartItemFindUniqueOrThrowArgs>(args: SelectSubset<T, CartItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CartItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindFirstArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CartItemFindFirstArgs>(args?: SelectSubset<T, CartItemFindFirstArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CartItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindFirstOrThrowArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CartItemFindFirstOrThrowArgs>(args?: SelectSubset<T, CartItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CartItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CartItems
     * const cartItems = await prisma.cartItem.findMany()
     * 
     * // Get first 10 CartItems
     * const cartItems = await prisma.cartItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cartItemWithIdOnly = await prisma.cartItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CartItemFindManyArgs>(args?: SelectSubset<T, CartItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CartItem.
     * @param {CartItemCreateArgs} args - Arguments to create a CartItem.
     * @example
     * // Create one CartItem
     * const CartItem = await prisma.cartItem.create({
     *   data: {
     *     // ... data to create a CartItem
     *   }
     * })
     * 
     */
    create<T extends CartItemCreateArgs>(args: SelectSubset<T, CartItemCreateArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CartItems.
     * @param {CartItemCreateManyArgs} args - Arguments to create many CartItems.
     * @example
     * // Create many CartItems
     * const cartItem = await prisma.cartItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CartItemCreateManyArgs>(args?: SelectSubset<T, CartItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CartItem.
     * @param {CartItemDeleteArgs} args - Arguments to delete one CartItem.
     * @example
     * // Delete one CartItem
     * const CartItem = await prisma.cartItem.delete({
     *   where: {
     *     // ... filter to delete one CartItem
     *   }
     * })
     * 
     */
    delete<T extends CartItemDeleteArgs>(args: SelectSubset<T, CartItemDeleteArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CartItem.
     * @param {CartItemUpdateArgs} args - Arguments to update one CartItem.
     * @example
     * // Update one CartItem
     * const cartItem = await prisma.cartItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CartItemUpdateArgs>(args: SelectSubset<T, CartItemUpdateArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CartItems.
     * @param {CartItemDeleteManyArgs} args - Arguments to filter CartItems to delete.
     * @example
     * // Delete a few CartItems
     * const { count } = await prisma.cartItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CartItemDeleteManyArgs>(args?: SelectSubset<T, CartItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CartItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CartItems
     * const cartItem = await prisma.cartItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CartItemUpdateManyArgs>(args: SelectSubset<T, CartItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CartItem.
     * @param {CartItemUpsertArgs} args - Arguments to update or create a CartItem.
     * @example
     * // Update or create a CartItem
     * const cartItem = await prisma.cartItem.upsert({
     *   create: {
     *     // ... data to create a CartItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CartItem we want to update
     *   }
     * })
     */
    upsert<T extends CartItemUpsertArgs>(args: SelectSubset<T, CartItemUpsertArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CartItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemCountArgs} args - Arguments to filter CartItems to count.
     * @example
     * // Count the number of CartItems
     * const count = await prisma.cartItem.count({
     *   where: {
     *     // ... the filter for the CartItems we want to count
     *   }
     * })
    **/
    count<T extends CartItemCountArgs>(
      args?: Subset<T, CartItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CartItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CartItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CartItemAggregateArgs>(args: Subset<T, CartItemAggregateArgs>): Prisma.PrismaPromise<GetCartItemAggregateType<T>>

    /**
     * Group by CartItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CartItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartItemGroupByArgs['orderBy'] }
        : { orderBy?: CartItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CartItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CartItem model
   */
  readonly fields: CartItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CartItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cart<T extends CartDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CartDefaultArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    variant<T extends VariantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VariantDefaultArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CartItem model
   */
  interface CartItemFieldRefs {
    readonly id: FieldRef<"CartItem", 'Int'>
    readonly cartId: FieldRef<"CartItem", 'Int'>
    readonly variantId: FieldRef<"CartItem", 'String'>
    readonly quantity: FieldRef<"CartItem", 'Int'>
    readonly addedAt: FieldRef<"CartItem", 'DateTime'>
    readonly updatedAt: FieldRef<"CartItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CartItem findUnique
   */
  export type CartItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem findUniqueOrThrow
   */
  export type CartItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem findFirst
   */
  export type CartItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartItems.
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartItems.
     */
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * CartItem findFirstOrThrow
   */
  export type CartItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartItems.
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartItems.
     */
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * CartItem findMany
   */
  export type CartItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItems to fetch.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CartItems.
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * CartItem create
   */
  export type CartItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * The data needed to create a CartItem.
     */
    data: XOR<CartItemCreateInput, CartItemUncheckedCreateInput>
  }

  /**
   * CartItem createMany
   */
  export type CartItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CartItems.
     */
    data: CartItemCreateManyInput | CartItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CartItem update
   */
  export type CartItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * The data needed to update a CartItem.
     */
    data: XOR<CartItemUpdateInput, CartItemUncheckedUpdateInput>
    /**
     * Choose, which CartItem to update.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem updateMany
   */
  export type CartItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CartItems.
     */
    data: XOR<CartItemUpdateManyMutationInput, CartItemUncheckedUpdateManyInput>
    /**
     * Filter which CartItems to update
     */
    where?: CartItemWhereInput
    /**
     * Limit how many CartItems to update.
     */
    limit?: number
  }

  /**
   * CartItem upsert
   */
  export type CartItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * The filter to search for the CartItem to update in case it exists.
     */
    where: CartItemWhereUniqueInput
    /**
     * In case the CartItem found by the `where` argument doesn't exist, create a new CartItem with this data.
     */
    create: XOR<CartItemCreateInput, CartItemUncheckedCreateInput>
    /**
     * In case the CartItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartItemUpdateInput, CartItemUncheckedUpdateInput>
  }

  /**
   * CartItem delete
   */
  export type CartItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter which CartItem to delete.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem deleteMany
   */
  export type CartItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartItems to delete
     */
    where?: CartItemWhereInput
    /**
     * Limit how many CartItems to delete.
     */
    limit?: number
  }

  /**
   * CartItem without action
   */
  export type CartItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    id: number | null
    shippingCost: number | null
    subtotal: number | null
    discountAmount: number | null
    taxAmount: number | null
    amountTotal: number | null
    deliveryDays: number | null
    shipmentCost: number | null
    promoCodeId: number | null
    promoDiscount: number | null
    addressId: number | null
  }

  export type OrderSumAggregateOutputType = {
    id: number | null
    shippingCost: number | null
    subtotal: number | null
    discountAmount: number | null
    taxAmount: number | null
    amountTotal: number | null
    deliveryDays: number | null
    shipmentCost: number | null
    promoCodeId: number | null
    promoDiscount: number | null
    addressId: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: number | null
    userId: string | null
    shippingMethod: string | null
    shippingCost: number | null
    stripeSessionId: string | null
    stripeCustomerId: string | null
    paymentIntentId: string | null
    subtotal: number | null
    discountAmount: number | null
    taxAmount: number | null
    amountTotal: number | null
    currency: string | null
    status: string | null
    trackingCode: string | null
    trackingNumber: string | null
    trackingUrl: string | null
    labelUrl: string | null
    deliveryDate: Date | null
    deliveryDays: number | null
    methodShipped: string | null
    carrier: string | null
    shipmentCost: number | null
    estimatedDelivery: string | null
    createdAt: Date | null
    updatedAt: Date | null
    promoCodeId: number | null
    promoCodeUsed: string | null
    promoDiscount: number | null
    addressId: number | null
    refundReason: string | null
    refundedAt: Date | null
    firstName: string | null
    lastName: string | null
    orderEmail: string | null
  }

  export type OrderMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    shippingMethod: string | null
    shippingCost: number | null
    stripeSessionId: string | null
    stripeCustomerId: string | null
    paymentIntentId: string | null
    subtotal: number | null
    discountAmount: number | null
    taxAmount: number | null
    amountTotal: number | null
    currency: string | null
    status: string | null
    trackingCode: string | null
    trackingNumber: string | null
    trackingUrl: string | null
    labelUrl: string | null
    deliveryDate: Date | null
    deliveryDays: number | null
    methodShipped: string | null
    carrier: string | null
    shipmentCost: number | null
    estimatedDelivery: string | null
    createdAt: Date | null
    updatedAt: Date | null
    promoCodeId: number | null
    promoCodeUsed: string | null
    promoDiscount: number | null
    addressId: number | null
    refundReason: string | null
    refundedAt: Date | null
    firstName: string | null
    lastName: string | null
    orderEmail: string | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    userId: number
    shippingAddress: number
    shippingMethod: number
    shippingCost: number
    stripeSessionId: number
    stripeCustomerId: number
    paymentIntentId: number
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency: number
    taxCalculation: number
    status: number
    trackingCode: number
    trackingNumber: number
    trackingUrl: number
    labelUrl: number
    deliveryDate: number
    deliveryDays: number
    methodShipped: number
    carrier: number
    shipmentCost: number
    estimatedDelivery: number
    createdAt: number
    updatedAt: number
    promoCodeId: number
    promoCodeUsed: number
    promoDiscount: number
    addressId: number
    refundReason: number
    refundedAt: number
    firstName: number
    lastName: number
    orderEmail: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    id?: true
    shippingCost?: true
    subtotal?: true
    discountAmount?: true
    taxAmount?: true
    amountTotal?: true
    deliveryDays?: true
    shipmentCost?: true
    promoCodeId?: true
    promoDiscount?: true
    addressId?: true
  }

  export type OrderSumAggregateInputType = {
    id?: true
    shippingCost?: true
    subtotal?: true
    discountAmount?: true
    taxAmount?: true
    amountTotal?: true
    deliveryDays?: true
    shipmentCost?: true
    promoCodeId?: true
    promoDiscount?: true
    addressId?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    userId?: true
    shippingMethod?: true
    shippingCost?: true
    stripeSessionId?: true
    stripeCustomerId?: true
    paymentIntentId?: true
    subtotal?: true
    discountAmount?: true
    taxAmount?: true
    amountTotal?: true
    currency?: true
    status?: true
    trackingCode?: true
    trackingNumber?: true
    trackingUrl?: true
    labelUrl?: true
    deliveryDate?: true
    deliveryDays?: true
    methodShipped?: true
    carrier?: true
    shipmentCost?: true
    estimatedDelivery?: true
    createdAt?: true
    updatedAt?: true
    promoCodeId?: true
    promoCodeUsed?: true
    promoDiscount?: true
    addressId?: true
    refundReason?: true
    refundedAt?: true
    firstName?: true
    lastName?: true
    orderEmail?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    userId?: true
    shippingMethod?: true
    shippingCost?: true
    stripeSessionId?: true
    stripeCustomerId?: true
    paymentIntentId?: true
    subtotal?: true
    discountAmount?: true
    taxAmount?: true
    amountTotal?: true
    currency?: true
    status?: true
    trackingCode?: true
    trackingNumber?: true
    trackingUrl?: true
    labelUrl?: true
    deliveryDate?: true
    deliveryDays?: true
    methodShipped?: true
    carrier?: true
    shipmentCost?: true
    estimatedDelivery?: true
    createdAt?: true
    updatedAt?: true
    promoCodeId?: true
    promoCodeUsed?: true
    promoDiscount?: true
    addressId?: true
    refundReason?: true
    refundedAt?: true
    firstName?: true
    lastName?: true
    orderEmail?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    userId?: true
    shippingAddress?: true
    shippingMethod?: true
    shippingCost?: true
    stripeSessionId?: true
    stripeCustomerId?: true
    paymentIntentId?: true
    subtotal?: true
    discountAmount?: true
    taxAmount?: true
    amountTotal?: true
    currency?: true
    taxCalculation?: true
    status?: true
    trackingCode?: true
    trackingNumber?: true
    trackingUrl?: true
    labelUrl?: true
    deliveryDate?: true
    deliveryDays?: true
    methodShipped?: true
    carrier?: true
    shipmentCost?: true
    estimatedDelivery?: true
    createdAt?: true
    updatedAt?: true
    promoCodeId?: true
    promoCodeUsed?: true
    promoDiscount?: true
    addressId?: true
    refundReason?: true
    refundedAt?: true
    firstName?: true
    lastName?: true
    orderEmail?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: number
    userId: string
    shippingAddress: JsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency: string
    taxCalculation: JsonValue | null
    status: string
    trackingCode: string | null
    trackingNumber: string | null
    trackingUrl: string | null
    labelUrl: string | null
    deliveryDate: Date | null
    deliveryDays: number | null
    methodShipped: string | null
    carrier: string | null
    shipmentCost: number | null
    estimatedDelivery: string | null
    createdAt: Date
    updatedAt: Date
    promoCodeId: number | null
    promoCodeUsed: string | null
    promoDiscount: number | null
    addressId: number | null
    refundReason: string | null
    refundedAt: Date | null
    firstName: string
    lastName: string
    orderEmail: string
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    shippingAddress?: boolean
    shippingMethod?: boolean
    shippingCost?: boolean
    stripeSessionId?: boolean
    stripeCustomerId?: boolean
    paymentIntentId?: boolean
    subtotal?: boolean
    discountAmount?: boolean
    taxAmount?: boolean
    amountTotal?: boolean
    currency?: boolean
    taxCalculation?: boolean
    status?: boolean
    trackingCode?: boolean
    trackingNumber?: boolean
    trackingUrl?: boolean
    labelUrl?: boolean
    deliveryDate?: boolean
    deliveryDays?: boolean
    methodShipped?: boolean
    carrier?: boolean
    shipmentCost?: boolean
    estimatedDelivery?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    promoCodeId?: boolean
    promoCodeUsed?: boolean
    promoDiscount?: boolean
    addressId?: boolean
    refundReason?: boolean
    refundedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    orderEmail?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    promoCode?: boolean | Order$promoCodeArgs<ExtArgs>
    address?: boolean | Order$addressArgs<ExtArgs>
    promoUsages?: boolean | Order$promoUsagesArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>



  export type OrderSelectScalar = {
    id?: boolean
    userId?: boolean
    shippingAddress?: boolean
    shippingMethod?: boolean
    shippingCost?: boolean
    stripeSessionId?: boolean
    stripeCustomerId?: boolean
    paymentIntentId?: boolean
    subtotal?: boolean
    discountAmount?: boolean
    taxAmount?: boolean
    amountTotal?: boolean
    currency?: boolean
    taxCalculation?: boolean
    status?: boolean
    trackingCode?: boolean
    trackingNumber?: boolean
    trackingUrl?: boolean
    labelUrl?: boolean
    deliveryDate?: boolean
    deliveryDays?: boolean
    methodShipped?: boolean
    carrier?: boolean
    shipmentCost?: boolean
    estimatedDelivery?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    promoCodeId?: boolean
    promoCodeUsed?: boolean
    promoDiscount?: boolean
    addressId?: boolean
    refundReason?: boolean
    refundedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    orderEmail?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "shippingAddress" | "shippingMethod" | "shippingCost" | "stripeSessionId" | "stripeCustomerId" | "paymentIntentId" | "subtotal" | "discountAmount" | "taxAmount" | "amountTotal" | "currency" | "taxCalculation" | "status" | "trackingCode" | "trackingNumber" | "trackingUrl" | "labelUrl" | "deliveryDate" | "deliveryDays" | "methodShipped" | "carrier" | "shipmentCost" | "estimatedDelivery" | "createdAt" | "updatedAt" | "promoCodeId" | "promoCodeUsed" | "promoDiscount" | "addressId" | "refundReason" | "refundedAt" | "firstName" | "lastName" | "orderEmail", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    promoCode?: boolean | Order$promoCodeArgs<ExtArgs>
    address?: boolean | Order$addressArgs<ExtArgs>
    promoUsages?: boolean | Order$promoUsagesArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      promoCode: Prisma.$PromoCodePayload<ExtArgs> | null
      address: Prisma.$AddressPayload<ExtArgs> | null
      promoUsages: Prisma.$PromoCodeUsagePayload<ExtArgs>[]
      items: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      shippingAddress: Prisma.JsonValue
      shippingMethod: string
      shippingCost: number
      stripeSessionId: string
      stripeCustomerId: string | null
      paymentIntentId: string
      subtotal: number
      discountAmount: number
      taxAmount: number
      amountTotal: number
      currency: string
      taxCalculation: Prisma.JsonValue | null
      status: string
      trackingCode: string | null
      trackingNumber: string | null
      trackingUrl: string | null
      labelUrl: string | null
      deliveryDate: Date | null
      deliveryDays: number | null
      methodShipped: string | null
      carrier: string | null
      shipmentCost: number | null
      estimatedDelivery: string | null
      createdAt: Date
      updatedAt: Date
      promoCodeId: number | null
      promoCodeUsed: string | null
      promoDiscount: number | null
      addressId: number | null
      refundReason: string | null
      refundedAt: Date | null
      firstName: string
      lastName: string
      orderEmail: string
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    promoCode<T extends Order$promoCodeArgs<ExtArgs> = {}>(args?: Subset<T, Order$promoCodeArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    address<T extends Order$addressArgs<ExtArgs> = {}>(args?: Subset<T, Order$addressArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    promoUsages<T extends Order$promoUsagesArgs<ExtArgs> = {}>(args?: Subset<T, Order$promoUsagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodeUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'Int'>
    readonly userId: FieldRef<"Order", 'String'>
    readonly shippingAddress: FieldRef<"Order", 'Json'>
    readonly shippingMethod: FieldRef<"Order", 'String'>
    readonly shippingCost: FieldRef<"Order", 'Int'>
    readonly stripeSessionId: FieldRef<"Order", 'String'>
    readonly stripeCustomerId: FieldRef<"Order", 'String'>
    readonly paymentIntentId: FieldRef<"Order", 'String'>
    readonly subtotal: FieldRef<"Order", 'Int'>
    readonly discountAmount: FieldRef<"Order", 'Int'>
    readonly taxAmount: FieldRef<"Order", 'Int'>
    readonly amountTotal: FieldRef<"Order", 'Int'>
    readonly currency: FieldRef<"Order", 'String'>
    readonly taxCalculation: FieldRef<"Order", 'Json'>
    readonly status: FieldRef<"Order", 'String'>
    readonly trackingCode: FieldRef<"Order", 'String'>
    readonly trackingNumber: FieldRef<"Order", 'String'>
    readonly trackingUrl: FieldRef<"Order", 'String'>
    readonly labelUrl: FieldRef<"Order", 'String'>
    readonly deliveryDate: FieldRef<"Order", 'DateTime'>
    readonly deliveryDays: FieldRef<"Order", 'Int'>
    readonly methodShipped: FieldRef<"Order", 'String'>
    readonly carrier: FieldRef<"Order", 'String'>
    readonly shipmentCost: FieldRef<"Order", 'Int'>
    readonly estimatedDelivery: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
    readonly promoCodeId: FieldRef<"Order", 'Int'>
    readonly promoCodeUsed: FieldRef<"Order", 'String'>
    readonly promoDiscount: FieldRef<"Order", 'Int'>
    readonly addressId: FieldRef<"Order", 'Int'>
    readonly refundReason: FieldRef<"Order", 'String'>
    readonly refundedAt: FieldRef<"Order", 'DateTime'>
    readonly firstName: FieldRef<"Order", 'String'>
    readonly lastName: FieldRef<"Order", 'String'>
    readonly orderEmail: FieldRef<"Order", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.promoCode
   */
  export type Order$promoCodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    where?: PromoCodeWhereInput
  }

  /**
   * Order.address
   */
  export type Order$addressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
  }

  /**
   * Order.promoUsages
   */
  export type Order$promoUsagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUsage
     */
    select?: PromoCodeUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUsage
     */
    omit?: PromoCodeUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUsageInclude<ExtArgs> | null
    where?: PromoCodeUsageWhereInput
    orderBy?: PromoCodeUsageOrderByWithRelationInput | PromoCodeUsageOrderByWithRelationInput[]
    cursor?: PromoCodeUsageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PromoCodeUsageScalarFieldEnum | PromoCodeUsageScalarFieldEnum[]
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    id: number | null
    orderId: number | null
    unitPrice: number | null
    quantity: number | null
    totalPrice: number | null
    taxAmount: number | null
    taxRate: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    id: number | null
    orderId: number | null
    unitPrice: number | null
    quantity: number | null
    totalPrice: number | null
    taxAmount: number | null
    taxRate: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: number | null
    orderId: number | null
    variantId: string | null
    productId: string | null
    productTitle: string | null
    variantSize: string | null
    variantColor: string | null
    variantSku: string | null
    unitPrice: number | null
    quantity: number | null
    totalPrice: number | null
    taxAmount: number | null
    taxRate: number | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: number | null
    orderId: number | null
    variantId: string | null
    productId: string | null
    productTitle: string | null
    variantSize: string | null
    variantColor: string | null
    variantSku: string | null
    unitPrice: number | null
    quantity: number | null
    totalPrice: number | null
    taxAmount: number | null
    taxRate: number | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    variantId: number
    productId: number
    productTitle: number
    images: number
    variantSize: number
    variantColor: number
    variantSku: number
    unitPrice: number
    quantity: number
    totalPrice: number
    taxAmount: number
    taxRate: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    id?: true
    orderId?: true
    unitPrice?: true
    quantity?: true
    totalPrice?: true
    taxAmount?: true
    taxRate?: true
  }

  export type OrderItemSumAggregateInputType = {
    id?: true
    orderId?: true
    unitPrice?: true
    quantity?: true
    totalPrice?: true
    taxAmount?: true
    taxRate?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    variantId?: true
    productId?: true
    productTitle?: true
    variantSize?: true
    variantColor?: true
    variantSku?: true
    unitPrice?: true
    quantity?: true
    totalPrice?: true
    taxAmount?: true
    taxRate?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    variantId?: true
    productId?: true
    productTitle?: true
    variantSize?: true
    variantColor?: true
    variantSku?: true
    unitPrice?: true
    quantity?: true
    totalPrice?: true
    taxAmount?: true
    taxRate?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    variantId?: true
    productId?: true
    productTitle?: true
    images?: true
    variantSize?: true
    variantColor?: true
    variantSku?: true
    unitPrice?: true
    quantity?: true
    totalPrice?: true
    taxAmount?: true
    taxRate?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: number
    orderId: number
    variantId: string
    productId: string
    productTitle: string
    images: JsonValue | null
    variantSize: string
    variantColor: string
    variantSku: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    taxAmount: number | null
    taxRate: number | null
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    variantId?: boolean
    productId?: boolean
    productTitle?: boolean
    images?: boolean
    variantSize?: boolean
    variantColor?: boolean
    variantSku?: boolean
    unitPrice?: boolean
    quantity?: boolean
    totalPrice?: boolean
    taxAmount?: boolean
    taxRate?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    variant?: boolean | VariantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>



  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    variantId?: boolean
    productId?: boolean
    productTitle?: boolean
    images?: boolean
    variantSize?: boolean
    variantColor?: boolean
    variantSku?: boolean
    unitPrice?: boolean
    quantity?: boolean
    totalPrice?: boolean
    taxAmount?: boolean
    taxRate?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "variantId" | "productId" | "productTitle" | "images" | "variantSize" | "variantColor" | "variantSku" | "unitPrice" | "quantity" | "totalPrice" | "taxAmount" | "taxRate", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    variant?: boolean | VariantDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      variant: Prisma.$VariantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderId: number
      variantId: string
      productId: string
      productTitle: string
      images: Prisma.JsonValue | null
      variantSize: string
      variantColor: string
      variantSku: string | null
      unitPrice: number
      quantity: number
      totalPrice: number
      taxAmount: number | null
      taxRate: number | null
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    variant<T extends VariantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VariantDefaultArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'Int'>
    readonly orderId: FieldRef<"OrderItem", 'Int'>
    readonly variantId: FieldRef<"OrderItem", 'String'>
    readonly productId: FieldRef<"OrderItem", 'String'>
    readonly productTitle: FieldRef<"OrderItem", 'String'>
    readonly images: FieldRef<"OrderItem", 'Json'>
    readonly variantSize: FieldRef<"OrderItem", 'String'>
    readonly variantColor: FieldRef<"OrderItem", 'String'>
    readonly variantSku: FieldRef<"OrderItem", 'String'>
    readonly unitPrice: FieldRef<"OrderItem", 'Int'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly totalPrice: FieldRef<"OrderItem", 'Int'>
    readonly taxAmount: FieldRef<"OrderItem", 'Int'>
    readonly taxRate: FieldRef<"OrderItem", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model Variant
   */

  export type AggregateVariant = {
    _count: VariantCountAggregateOutputType | null
    _avg: VariantAvgAggregateOutputType | null
    _sum: VariantSumAggregateOutputType | null
    _min: VariantMinAggregateOutputType | null
    _max: VariantMaxAggregateOutputType | null
  }

  export type VariantAvgAggregateOutputType = {
    stockQuantity: number | null
  }

  export type VariantSumAggregateOutputType = {
    stockQuantity: number | null
  }

  export type VariantMinAggregateOutputType = {
    id: string | null
    productId: string | null
    size: string | null
    color: string | null
    stockQuantity: number | null
    sku: string | null
    sanityRevisionId: string | null
    lastSyncedAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VariantMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    size: string | null
    color: string | null
    stockQuantity: number | null
    sku: string | null
    sanityRevisionId: string | null
    lastSyncedAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VariantCountAggregateOutputType = {
    id: number
    productId: number
    size: number
    color: number
    stockQuantity: number
    sku: number
    sanityRevisionId: number
    lastSyncedAt: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VariantAvgAggregateInputType = {
    stockQuantity?: true
  }

  export type VariantSumAggregateInputType = {
    stockQuantity?: true
  }

  export type VariantMinAggregateInputType = {
    id?: true
    productId?: true
    size?: true
    color?: true
    stockQuantity?: true
    sku?: true
    sanityRevisionId?: true
    lastSyncedAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VariantMaxAggregateInputType = {
    id?: true
    productId?: true
    size?: true
    color?: true
    stockQuantity?: true
    sku?: true
    sanityRevisionId?: true
    lastSyncedAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VariantCountAggregateInputType = {
    id?: true
    productId?: true
    size?: true
    color?: true
    stockQuantity?: true
    sku?: true
    sanityRevisionId?: true
    lastSyncedAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VariantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Variant to aggregate.
     */
    where?: VariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Variants to fetch.
     */
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Variants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Variants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Variants
    **/
    _count?: true | VariantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VariantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VariantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VariantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VariantMaxAggregateInputType
  }

  export type GetVariantAggregateType<T extends VariantAggregateArgs> = {
        [P in keyof T & keyof AggregateVariant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVariant[P]>
      : GetScalarType<T[P], AggregateVariant[P]>
  }




  export type VariantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VariantWhereInput
    orderBy?: VariantOrderByWithAggregationInput | VariantOrderByWithAggregationInput[]
    by: VariantScalarFieldEnum[] | VariantScalarFieldEnum
    having?: VariantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VariantCountAggregateInputType | true
    _avg?: VariantAvgAggregateInputType
    _sum?: VariantSumAggregateInputType
    _min?: VariantMinAggregateInputType
    _max?: VariantMaxAggregateInputType
  }

  export type VariantGroupByOutputType = {
    id: string
    productId: string
    size: string
    color: string
    stockQuantity: number
    sku: string | null
    sanityRevisionId: string | null
    lastSyncedAt: Date
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: VariantCountAggregateOutputType | null
    _avg: VariantAvgAggregateOutputType | null
    _sum: VariantSumAggregateOutputType | null
    _min: VariantMinAggregateOutputType | null
    _max: VariantMaxAggregateOutputType | null
  }

  type GetVariantGroupByPayload<T extends VariantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VariantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VariantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VariantGroupByOutputType[P]>
            : GetScalarType<T[P], VariantGroupByOutputType[P]>
        }
      >
    >


  export type VariantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    size?: boolean
    color?: boolean
    stockQuantity?: boolean
    sku?: boolean
    sanityRevisionId?: boolean
    lastSyncedAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    cartItems?: boolean | Variant$cartItemsArgs<ExtArgs>
    orderItems?: boolean | Variant$orderItemsArgs<ExtArgs>
    _count?: boolean | VariantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["variant"]>



  export type VariantSelectScalar = {
    id?: boolean
    productId?: boolean
    size?: boolean
    color?: boolean
    stockQuantity?: boolean
    sku?: boolean
    sanityRevisionId?: boolean
    lastSyncedAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VariantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "size" | "color" | "stockQuantity" | "sku" | "sanityRevisionId" | "lastSyncedAt" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["variant"]>
  export type VariantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    cartItems?: boolean | Variant$cartItemsArgs<ExtArgs>
    orderItems?: boolean | Variant$orderItemsArgs<ExtArgs>
    _count?: boolean | VariantCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $VariantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Variant"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      cartItems: Prisma.$CartItemPayload<ExtArgs>[]
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      size: string
      color: string
      stockQuantity: number
      sku: string | null
      sanityRevisionId: string | null
      lastSyncedAt: Date
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["variant"]>
    composites: {}
  }

  type VariantGetPayload<S extends boolean | null | undefined | VariantDefaultArgs> = $Result.GetResult<Prisma.$VariantPayload, S>

  type VariantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VariantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VariantCountAggregateInputType | true
    }

  export interface VariantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Variant'], meta: { name: 'Variant' } }
    /**
     * Find zero or one Variant that matches the filter.
     * @param {VariantFindUniqueArgs} args - Arguments to find a Variant
     * @example
     * // Get one Variant
     * const variant = await prisma.variant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VariantFindUniqueArgs>(args: SelectSubset<T, VariantFindUniqueArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Variant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VariantFindUniqueOrThrowArgs} args - Arguments to find a Variant
     * @example
     * // Get one Variant
     * const variant = await prisma.variant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VariantFindUniqueOrThrowArgs>(args: SelectSubset<T, VariantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Variant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantFindFirstArgs} args - Arguments to find a Variant
     * @example
     * // Get one Variant
     * const variant = await prisma.variant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VariantFindFirstArgs>(args?: SelectSubset<T, VariantFindFirstArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Variant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantFindFirstOrThrowArgs} args - Arguments to find a Variant
     * @example
     * // Get one Variant
     * const variant = await prisma.variant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VariantFindFirstOrThrowArgs>(args?: SelectSubset<T, VariantFindFirstOrThrowArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Variants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Variants
     * const variants = await prisma.variant.findMany()
     * 
     * // Get first 10 Variants
     * const variants = await prisma.variant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const variantWithIdOnly = await prisma.variant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VariantFindManyArgs>(args?: SelectSubset<T, VariantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Variant.
     * @param {VariantCreateArgs} args - Arguments to create a Variant.
     * @example
     * // Create one Variant
     * const Variant = await prisma.variant.create({
     *   data: {
     *     // ... data to create a Variant
     *   }
     * })
     * 
     */
    create<T extends VariantCreateArgs>(args: SelectSubset<T, VariantCreateArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Variants.
     * @param {VariantCreateManyArgs} args - Arguments to create many Variants.
     * @example
     * // Create many Variants
     * const variant = await prisma.variant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VariantCreateManyArgs>(args?: SelectSubset<T, VariantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Variant.
     * @param {VariantDeleteArgs} args - Arguments to delete one Variant.
     * @example
     * // Delete one Variant
     * const Variant = await prisma.variant.delete({
     *   where: {
     *     // ... filter to delete one Variant
     *   }
     * })
     * 
     */
    delete<T extends VariantDeleteArgs>(args: SelectSubset<T, VariantDeleteArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Variant.
     * @param {VariantUpdateArgs} args - Arguments to update one Variant.
     * @example
     * // Update one Variant
     * const variant = await prisma.variant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VariantUpdateArgs>(args: SelectSubset<T, VariantUpdateArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Variants.
     * @param {VariantDeleteManyArgs} args - Arguments to filter Variants to delete.
     * @example
     * // Delete a few Variants
     * const { count } = await prisma.variant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VariantDeleteManyArgs>(args?: SelectSubset<T, VariantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Variants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Variants
     * const variant = await prisma.variant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VariantUpdateManyArgs>(args: SelectSubset<T, VariantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Variant.
     * @param {VariantUpsertArgs} args - Arguments to update or create a Variant.
     * @example
     * // Update or create a Variant
     * const variant = await prisma.variant.upsert({
     *   create: {
     *     // ... data to create a Variant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Variant we want to update
     *   }
     * })
     */
    upsert<T extends VariantUpsertArgs>(args: SelectSubset<T, VariantUpsertArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Variants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantCountArgs} args - Arguments to filter Variants to count.
     * @example
     * // Count the number of Variants
     * const count = await prisma.variant.count({
     *   where: {
     *     // ... the filter for the Variants we want to count
     *   }
     * })
    **/
    count<T extends VariantCountArgs>(
      args?: Subset<T, VariantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VariantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Variant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VariantAggregateArgs>(args: Subset<T, VariantAggregateArgs>): Prisma.PrismaPromise<GetVariantAggregateType<T>>

    /**
     * Group by Variant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VariantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VariantGroupByArgs['orderBy'] }
        : { orderBy?: VariantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VariantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVariantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Variant model
   */
  readonly fields: VariantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Variant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VariantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cartItems<T extends Variant$cartItemsArgs<ExtArgs> = {}>(args?: Subset<T, Variant$cartItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orderItems<T extends Variant$orderItemsArgs<ExtArgs> = {}>(args?: Subset<T, Variant$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Variant model
   */
  interface VariantFieldRefs {
    readonly id: FieldRef<"Variant", 'String'>
    readonly productId: FieldRef<"Variant", 'String'>
    readonly size: FieldRef<"Variant", 'String'>
    readonly color: FieldRef<"Variant", 'String'>
    readonly stockQuantity: FieldRef<"Variant", 'Int'>
    readonly sku: FieldRef<"Variant", 'String'>
    readonly sanityRevisionId: FieldRef<"Variant", 'String'>
    readonly lastSyncedAt: FieldRef<"Variant", 'DateTime'>
    readonly isActive: FieldRef<"Variant", 'Boolean'>
    readonly createdAt: FieldRef<"Variant", 'DateTime'>
    readonly updatedAt: FieldRef<"Variant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Variant findUnique
   */
  export type VariantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variant to fetch.
     */
    where: VariantWhereUniqueInput
  }

  /**
   * Variant findUniqueOrThrow
   */
  export type VariantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variant to fetch.
     */
    where: VariantWhereUniqueInput
  }

  /**
   * Variant findFirst
   */
  export type VariantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variant to fetch.
     */
    where?: VariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Variants to fetch.
     */
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Variants.
     */
    cursor?: VariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Variants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Variants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Variants.
     */
    distinct?: VariantScalarFieldEnum | VariantScalarFieldEnum[]
  }

  /**
   * Variant findFirstOrThrow
   */
  export type VariantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variant to fetch.
     */
    where?: VariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Variants to fetch.
     */
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Variants.
     */
    cursor?: VariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Variants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Variants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Variants.
     */
    distinct?: VariantScalarFieldEnum | VariantScalarFieldEnum[]
  }

  /**
   * Variant findMany
   */
  export type VariantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variants to fetch.
     */
    where?: VariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Variants to fetch.
     */
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Variants.
     */
    cursor?: VariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Variants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Variants.
     */
    skip?: number
    distinct?: VariantScalarFieldEnum | VariantScalarFieldEnum[]
  }

  /**
   * Variant create
   */
  export type VariantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * The data needed to create a Variant.
     */
    data: XOR<VariantCreateInput, VariantUncheckedCreateInput>
  }

  /**
   * Variant createMany
   */
  export type VariantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Variants.
     */
    data: VariantCreateManyInput | VariantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Variant update
   */
  export type VariantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * The data needed to update a Variant.
     */
    data: XOR<VariantUpdateInput, VariantUncheckedUpdateInput>
    /**
     * Choose, which Variant to update.
     */
    where: VariantWhereUniqueInput
  }

  /**
   * Variant updateMany
   */
  export type VariantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Variants.
     */
    data: XOR<VariantUpdateManyMutationInput, VariantUncheckedUpdateManyInput>
    /**
     * Filter which Variants to update
     */
    where?: VariantWhereInput
    /**
     * Limit how many Variants to update.
     */
    limit?: number
  }

  /**
   * Variant upsert
   */
  export type VariantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * The filter to search for the Variant to update in case it exists.
     */
    where: VariantWhereUniqueInput
    /**
     * In case the Variant found by the `where` argument doesn't exist, create a new Variant with this data.
     */
    create: XOR<VariantCreateInput, VariantUncheckedCreateInput>
    /**
     * In case the Variant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VariantUpdateInput, VariantUncheckedUpdateInput>
  }

  /**
   * Variant delete
   */
  export type VariantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter which Variant to delete.
     */
    where: VariantWhereUniqueInput
  }

  /**
   * Variant deleteMany
   */
  export type VariantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Variants to delete
     */
    where?: VariantWhereInput
    /**
     * Limit how many Variants to delete.
     */
    limit?: number
  }

  /**
   * Variant.cartItems
   */
  export type Variant$cartItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    where?: CartItemWhereInput
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    cursor?: CartItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * Variant.orderItems
   */
  export type Variant$orderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Variant without action
   */
  export type VariantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    slug: string | null
    price: number | null
    sanityRevisionId: string | null
    lastSyncedAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    slug: string | null
    price: number | null
    sanityRevisionId: string | null
    lastSyncedAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    title: number
    description: number
    slug: number
    price: number
    images: number
    categories: number
    sanityRevisionId: number
    lastSyncedAt: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    slug?: true
    price?: true
    sanityRevisionId?: true
    lastSyncedAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    slug?: true
    price?: true
    sanityRevisionId?: true
    lastSyncedAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    slug?: true
    price?: true
    images?: true
    categories?: true
    sanityRevisionId?: true
    lastSyncedAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    title: string
    description: string | null
    slug: string
    price: number | null
    images: JsonValue | null
    categories: JsonValue | null
    sanityRevisionId: string | null
    lastSyncedAt: Date
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    slug?: boolean
    price?: boolean
    images?: boolean
    categories?: boolean
    sanityRevisionId?: boolean
    lastSyncedAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    variants?: boolean | Product$variantsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>



  export type ProductSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    slug?: boolean
    price?: boolean
    images?: boolean
    categories?: boolean
    sanityRevisionId?: boolean
    lastSyncedAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "slug" | "price" | "images" | "categories" | "sanityRevisionId" | "lastSyncedAt" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variants?: boolean | Product$variantsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      variants: Prisma.$VariantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      slug: string
      price: number | null
      images: Prisma.JsonValue | null
      categories: Prisma.JsonValue | null
      sanityRevisionId: string | null
      lastSyncedAt: Date
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    variants<T extends Product$variantsArgs<ExtArgs> = {}>(args?: Subset<T, Product$variantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly title: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Int'>
    readonly images: FieldRef<"Product", 'Json'>
    readonly categories: FieldRef<"Product", 'Json'>
    readonly sanityRevisionId: FieldRef<"Product", 'String'>
    readonly lastSyncedAt: FieldRef<"Product", 'DateTime'>
    readonly isActive: FieldRef<"Product", 'Boolean'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.variants
   */
  export type Product$variantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    where?: VariantWhereInput
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    cursor?: VariantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VariantScalarFieldEnum | VariantScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Address
   */

  export type AggregateAddress = {
    _count: AddressCountAggregateOutputType | null
    _avg: AddressAvgAggregateOutputType | null
    _sum: AddressSumAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  export type AddressAvgAggregateOutputType = {
    id: number | null
  }

  export type AddressSumAggregateOutputType = {
    id: number | null
  }

  export type AddressMinAggregateOutputType = {
    id: number | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    company: string | null
    line1: string | null
    line2: string | null
    city: string | null
    state: string | null
    country: string | null
    postalCode: string | null
    phone: string | null
    type: string | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AddressMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    company: string | null
    line1: string | null
    line2: string | null
    city: string | null
    state: string | null
    country: string | null
    postalCode: string | null
    phone: string | null
    type: string | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AddressCountAggregateOutputType = {
    id: number
    userId: number
    firstName: number
    lastName: number
    company: number
    line1: number
    line2: number
    city: number
    state: number
    country: number
    postalCode: number
    phone: number
    type: number
    isDefault: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AddressAvgAggregateInputType = {
    id?: true
  }

  export type AddressSumAggregateInputType = {
    id?: true
  }

  export type AddressMinAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    company?: true
    line1?: true
    line2?: true
    city?: true
    state?: true
    country?: true
    postalCode?: true
    phone?: true
    type?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AddressMaxAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    company?: true
    line1?: true
    line2?: true
    city?: true
    state?: true
    country?: true
    postalCode?: true
    phone?: true
    type?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AddressCountAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    company?: true
    line1?: true
    line2?: true
    city?: true
    state?: true
    country?: true
    postalCode?: true
    phone?: true
    type?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Address to aggregate.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Addresses
    **/
    _count?: true | AddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AddressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AddressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressMaxAggregateInputType
  }

  export type GetAddressAggregateType<T extends AddressAggregateArgs> = {
        [P in keyof T & keyof AggregateAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddress[P]>
      : GetScalarType<T[P], AggregateAddress[P]>
  }




  export type AddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithAggregationInput | AddressOrderByWithAggregationInput[]
    by: AddressScalarFieldEnum[] | AddressScalarFieldEnum
    having?: AddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressCountAggregateInputType | true
    _avg?: AddressAvgAggregateInputType
    _sum?: AddressSumAggregateInputType
    _min?: AddressMinAggregateInputType
    _max?: AddressMaxAggregateInputType
  }

  export type AddressGroupByOutputType = {
    id: number
    userId: string
    firstName: string
    lastName: string
    company: string | null
    line1: string
    line2: string | null
    city: string
    state: string
    country: string
    postalCode: string
    phone: string | null
    type: string
    isDefault: boolean
    createdAt: Date
    updatedAt: Date
    _count: AddressCountAggregateOutputType | null
    _avg: AddressAvgAggregateOutputType | null
    _sum: AddressSumAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  type GetAddressGroupByPayload<T extends AddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressGroupByOutputType[P]>
            : GetScalarType<T[P], AddressGroupByOutputType[P]>
        }
      >
    >


  export type AddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    company?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
    phone?: boolean
    type?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    orders?: boolean | Address$ordersArgs<ExtArgs>
    carts?: boolean | Address$cartsArgs<ExtArgs>
    _count?: boolean | AddressCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>



  export type AddressSelectScalar = {
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    company?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
    phone?: boolean
    type?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "firstName" | "lastName" | "company" | "line1" | "line2" | "city" | "state" | "country" | "postalCode" | "phone" | "type" | "isDefault" | "createdAt" | "updatedAt", ExtArgs["result"]["address"]>
  export type AddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    orders?: boolean | Address$ordersArgs<ExtArgs>
    carts?: boolean | Address$cartsArgs<ExtArgs>
    _count?: boolean | AddressCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Address"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      orders: Prisma.$OrderPayload<ExtArgs>[]
      carts: Prisma.$CartPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      firstName: string
      lastName: string
      company: string | null
      line1: string
      line2: string | null
      city: string
      state: string
      country: string
      postalCode: string
      phone: string | null
      type: string
      isDefault: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["address"]>
    composites: {}
  }

  type AddressGetPayload<S extends boolean | null | undefined | AddressDefaultArgs> = $Result.GetResult<Prisma.$AddressPayload, S>

  type AddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressCountAggregateInputType | true
    }

  export interface AddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Address'], meta: { name: 'Address' } }
    /**
     * Find zero or one Address that matches the filter.
     * @param {AddressFindUniqueArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressFindUniqueArgs>(args: SelectSubset<T, AddressFindUniqueArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Address that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressFindUniqueOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressFindFirstArgs>(args?: SelectSubset<T, AddressFindFirstArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Addresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Addresses
     * const addresses = await prisma.address.findMany()
     * 
     * // Get first 10 Addresses
     * const addresses = await prisma.address.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressWithIdOnly = await prisma.address.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressFindManyArgs>(args?: SelectSubset<T, AddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Address.
     * @param {AddressCreateArgs} args - Arguments to create a Address.
     * @example
     * // Create one Address
     * const Address = await prisma.address.create({
     *   data: {
     *     // ... data to create a Address
     *   }
     * })
     * 
     */
    create<T extends AddressCreateArgs>(args: SelectSubset<T, AddressCreateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Addresses.
     * @param {AddressCreateManyArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressCreateManyArgs>(args?: SelectSubset<T, AddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Address.
     * @param {AddressDeleteArgs} args - Arguments to delete one Address.
     * @example
     * // Delete one Address
     * const Address = await prisma.address.delete({
     *   where: {
     *     // ... filter to delete one Address
     *   }
     * })
     * 
     */
    delete<T extends AddressDeleteArgs>(args: SelectSubset<T, AddressDeleteArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Address.
     * @param {AddressUpdateArgs} args - Arguments to update one Address.
     * @example
     * // Update one Address
     * const address = await prisma.address.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressUpdateArgs>(args: SelectSubset<T, AddressUpdateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Addresses.
     * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
     * @example
     * // Delete a few Addresses
     * const { count } = await prisma.address.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressDeleteManyArgs>(args?: SelectSubset<T, AddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressUpdateManyArgs>(args: SelectSubset<T, AddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Address.
     * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
     * @example
     * // Update or create a Address
     * const address = await prisma.address.upsert({
     *   create: {
     *     // ... data to create a Address
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Address we want to update
     *   }
     * })
     */
    upsert<T extends AddressUpsertArgs>(args: SelectSubset<T, AddressUpsertArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressCountArgs} args - Arguments to filter Addresses to count.
     * @example
     * // Count the number of Addresses
     * const count = await prisma.address.count({
     *   where: {
     *     // ... the filter for the Addresses we want to count
     *   }
     * })
    **/
    count<T extends AddressCountArgs>(
      args?: Subset<T, AddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddressAggregateArgs>(args: Subset<T, AddressAggregateArgs>): Prisma.PrismaPromise<GetAddressAggregateType<T>>

    /**
     * Group by Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressGroupByArgs['orderBy'] }
        : { orderBy?: AddressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Address model
   */
  readonly fields: AddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Address.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    orders<T extends Address$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Address$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    carts<T extends Address$cartsArgs<ExtArgs> = {}>(args?: Subset<T, Address$cartsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Address model
   */
  interface AddressFieldRefs {
    readonly id: FieldRef<"Address", 'Int'>
    readonly userId: FieldRef<"Address", 'String'>
    readonly firstName: FieldRef<"Address", 'String'>
    readonly lastName: FieldRef<"Address", 'String'>
    readonly company: FieldRef<"Address", 'String'>
    readonly line1: FieldRef<"Address", 'String'>
    readonly line2: FieldRef<"Address", 'String'>
    readonly city: FieldRef<"Address", 'String'>
    readonly state: FieldRef<"Address", 'String'>
    readonly country: FieldRef<"Address", 'String'>
    readonly postalCode: FieldRef<"Address", 'String'>
    readonly phone: FieldRef<"Address", 'String'>
    readonly type: FieldRef<"Address", 'String'>
    readonly isDefault: FieldRef<"Address", 'Boolean'>
    readonly createdAt: FieldRef<"Address", 'DateTime'>
    readonly updatedAt: FieldRef<"Address", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Address findUnique
   */
  export type AddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findUniqueOrThrow
   */
  export type AddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findFirst
   */
  export type AddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findFirstOrThrow
   */
  export type AddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findMany
   */
  export type AddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Addresses to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address create
   */
  export type AddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to create a Address.
     */
    data: XOR<AddressCreateInput, AddressUncheckedCreateInput>
  }

  /**
   * Address createMany
   */
  export type AddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Address update
   */
  export type AddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to update a Address.
     */
    data: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
    /**
     * Choose, which Address to update.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address updateMany
   */
  export type AddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
  }

  /**
   * Address upsert
   */
  export type AddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The filter to search for the Address to update in case it exists.
     */
    where: AddressWhereUniqueInput
    /**
     * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
     */
    create: XOR<AddressCreateInput, AddressUncheckedCreateInput>
    /**
     * In case the Address was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
  }

  /**
   * Address delete
   */
  export type AddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter which Address to delete.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address deleteMany
   */
  export type AddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Addresses to delete
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to delete.
     */
    limit?: number
  }

  /**
   * Address.orders
   */
  export type Address$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Address.carts
   */
  export type Address$cartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    where?: CartWhereInput
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    cursor?: CartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Address without action
   */
  export type AddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
  }


  /**
   * Model CheckoutSession
   */

  export type AggregateCheckoutSession = {
    _count: CheckoutSessionCountAggregateOutputType | null
    _avg: CheckoutSessionAvgAggregateOutputType | null
    _sum: CheckoutSessionSumAggregateOutputType | null
    _min: CheckoutSessionMinAggregateOutputType | null
    _max: CheckoutSessionMaxAggregateOutputType | null
  }

  export type CheckoutSessionAvgAggregateOutputType = {
    id: number | null
    cartId: number | null
    subtotal: number | null
    estimatedTax: number | null
    estimatedShipping: number | null
    promoDiscount: number | null
    estimatedTotal: number | null
    finalTax: number | null
    finalShipping: number | null
    finalTotal: number | null
  }

  export type CheckoutSessionSumAggregateOutputType = {
    id: number | null
    cartId: number | null
    subtotal: number | null
    estimatedTax: number | null
    estimatedShipping: number | null
    promoDiscount: number | null
    estimatedTotal: number | null
    finalTax: number | null
    finalShipping: number | null
    finalTotal: number | null
  }

  export type CheckoutSessionMinAggregateOutputType = {
    id: number | null
    stripeSessionId: string | null
    cartId: number | null
    subtotal: number | null
    estimatedTax: number | null
    estimatedShipping: number | null
    promoDiscount: number | null
    estimatedTotal: number | null
    finalTax: number | null
    finalShipping: number | null
    finalTotal: number | null
    status: string | null
    stripeEventId: string | null
    webhookProcessedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CheckoutSessionMaxAggregateOutputType = {
    id: number | null
    stripeSessionId: string | null
    cartId: number | null
    subtotal: number | null
    estimatedTax: number | null
    estimatedShipping: number | null
    promoDiscount: number | null
    estimatedTotal: number | null
    finalTax: number | null
    finalShipping: number | null
    finalTotal: number | null
    status: string | null
    stripeEventId: string | null
    webhookProcessedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CheckoutSessionCountAggregateOutputType = {
    id: number
    stripeSessionId: number
    cartId: number
    subtotal: number
    estimatedTax: number
    estimatedShipping: number
    promoDiscount: number
    estimatedTotal: number
    finalTax: number
    finalShipping: number
    finalTotal: number
    status: number
    stripeEventId: number
    webhookProcessedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CheckoutSessionAvgAggregateInputType = {
    id?: true
    cartId?: true
    subtotal?: true
    estimatedTax?: true
    estimatedShipping?: true
    promoDiscount?: true
    estimatedTotal?: true
    finalTax?: true
    finalShipping?: true
    finalTotal?: true
  }

  export type CheckoutSessionSumAggregateInputType = {
    id?: true
    cartId?: true
    subtotal?: true
    estimatedTax?: true
    estimatedShipping?: true
    promoDiscount?: true
    estimatedTotal?: true
    finalTax?: true
    finalShipping?: true
    finalTotal?: true
  }

  export type CheckoutSessionMinAggregateInputType = {
    id?: true
    stripeSessionId?: true
    cartId?: true
    subtotal?: true
    estimatedTax?: true
    estimatedShipping?: true
    promoDiscount?: true
    estimatedTotal?: true
    finalTax?: true
    finalShipping?: true
    finalTotal?: true
    status?: true
    stripeEventId?: true
    webhookProcessedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CheckoutSessionMaxAggregateInputType = {
    id?: true
    stripeSessionId?: true
    cartId?: true
    subtotal?: true
    estimatedTax?: true
    estimatedShipping?: true
    promoDiscount?: true
    estimatedTotal?: true
    finalTax?: true
    finalShipping?: true
    finalTotal?: true
    status?: true
    stripeEventId?: true
    webhookProcessedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CheckoutSessionCountAggregateInputType = {
    id?: true
    stripeSessionId?: true
    cartId?: true
    subtotal?: true
    estimatedTax?: true
    estimatedShipping?: true
    promoDiscount?: true
    estimatedTotal?: true
    finalTax?: true
    finalShipping?: true
    finalTotal?: true
    status?: true
    stripeEventId?: true
    webhookProcessedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CheckoutSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CheckoutSession to aggregate.
     */
    where?: CheckoutSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutSessions to fetch.
     */
    orderBy?: CheckoutSessionOrderByWithRelationInput | CheckoutSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CheckoutSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CheckoutSessions
    **/
    _count?: true | CheckoutSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CheckoutSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CheckoutSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CheckoutSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CheckoutSessionMaxAggregateInputType
  }

  export type GetCheckoutSessionAggregateType<T extends CheckoutSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateCheckoutSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCheckoutSession[P]>
      : GetScalarType<T[P], AggregateCheckoutSession[P]>
  }




  export type CheckoutSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CheckoutSessionWhereInput
    orderBy?: CheckoutSessionOrderByWithAggregationInput | CheckoutSessionOrderByWithAggregationInput[]
    by: CheckoutSessionScalarFieldEnum[] | CheckoutSessionScalarFieldEnum
    having?: CheckoutSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CheckoutSessionCountAggregateInputType | true
    _avg?: CheckoutSessionAvgAggregateInputType
    _sum?: CheckoutSessionSumAggregateInputType
    _min?: CheckoutSessionMinAggregateInputType
    _max?: CheckoutSessionMaxAggregateInputType
  }

  export type CheckoutSessionGroupByOutputType = {
    id: number
    stripeSessionId: string
    cartId: number | null
    subtotal: number
    estimatedTax: number
    estimatedShipping: number
    promoDiscount: number
    estimatedTotal: number
    finalTax: number | null
    finalShipping: number | null
    finalTotal: number | null
    status: string
    stripeEventId: string | null
    webhookProcessedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: CheckoutSessionCountAggregateOutputType | null
    _avg: CheckoutSessionAvgAggregateOutputType | null
    _sum: CheckoutSessionSumAggregateOutputType | null
    _min: CheckoutSessionMinAggregateOutputType | null
    _max: CheckoutSessionMaxAggregateOutputType | null
  }

  type GetCheckoutSessionGroupByPayload<T extends CheckoutSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CheckoutSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CheckoutSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CheckoutSessionGroupByOutputType[P]>
            : GetScalarType<T[P], CheckoutSessionGroupByOutputType[P]>
        }
      >
    >


  export type CheckoutSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stripeSessionId?: boolean
    cartId?: boolean
    subtotal?: boolean
    estimatedTax?: boolean
    estimatedShipping?: boolean
    promoDiscount?: boolean
    estimatedTotal?: boolean
    finalTax?: boolean
    finalShipping?: boolean
    finalTotal?: boolean
    status?: boolean
    stripeEventId?: boolean
    webhookProcessedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cart?: boolean | CheckoutSession$cartArgs<ExtArgs>
  }, ExtArgs["result"]["checkoutSession"]>



  export type CheckoutSessionSelectScalar = {
    id?: boolean
    stripeSessionId?: boolean
    cartId?: boolean
    subtotal?: boolean
    estimatedTax?: boolean
    estimatedShipping?: boolean
    promoDiscount?: boolean
    estimatedTotal?: boolean
    finalTax?: boolean
    finalShipping?: boolean
    finalTotal?: boolean
    status?: boolean
    stripeEventId?: boolean
    webhookProcessedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CheckoutSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stripeSessionId" | "cartId" | "subtotal" | "estimatedTax" | "estimatedShipping" | "promoDiscount" | "estimatedTotal" | "finalTax" | "finalShipping" | "finalTotal" | "status" | "stripeEventId" | "webhookProcessedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["checkoutSession"]>
  export type CheckoutSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cart?: boolean | CheckoutSession$cartArgs<ExtArgs>
  }

  export type $CheckoutSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CheckoutSession"
    objects: {
      cart: Prisma.$CartPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      stripeSessionId: string
      cartId: number | null
      subtotal: number
      estimatedTax: number
      estimatedShipping: number
      promoDiscount: number
      estimatedTotal: number
      finalTax: number | null
      finalShipping: number | null
      finalTotal: number | null
      status: string
      stripeEventId: string | null
      webhookProcessedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["checkoutSession"]>
    composites: {}
  }

  type CheckoutSessionGetPayload<S extends boolean | null | undefined | CheckoutSessionDefaultArgs> = $Result.GetResult<Prisma.$CheckoutSessionPayload, S>

  type CheckoutSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CheckoutSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CheckoutSessionCountAggregateInputType | true
    }

  export interface CheckoutSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CheckoutSession'], meta: { name: 'CheckoutSession' } }
    /**
     * Find zero or one CheckoutSession that matches the filter.
     * @param {CheckoutSessionFindUniqueArgs} args - Arguments to find a CheckoutSession
     * @example
     * // Get one CheckoutSession
     * const checkoutSession = await prisma.checkoutSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CheckoutSessionFindUniqueArgs>(args: SelectSubset<T, CheckoutSessionFindUniqueArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CheckoutSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CheckoutSessionFindUniqueOrThrowArgs} args - Arguments to find a CheckoutSession
     * @example
     * // Get one CheckoutSession
     * const checkoutSession = await prisma.checkoutSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CheckoutSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, CheckoutSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CheckoutSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSessionFindFirstArgs} args - Arguments to find a CheckoutSession
     * @example
     * // Get one CheckoutSession
     * const checkoutSession = await prisma.checkoutSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CheckoutSessionFindFirstArgs>(args?: SelectSubset<T, CheckoutSessionFindFirstArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CheckoutSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSessionFindFirstOrThrowArgs} args - Arguments to find a CheckoutSession
     * @example
     * // Get one CheckoutSession
     * const checkoutSession = await prisma.checkoutSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CheckoutSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, CheckoutSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CheckoutSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CheckoutSessions
     * const checkoutSessions = await prisma.checkoutSession.findMany()
     * 
     * // Get first 10 CheckoutSessions
     * const checkoutSessions = await prisma.checkoutSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const checkoutSessionWithIdOnly = await prisma.checkoutSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CheckoutSessionFindManyArgs>(args?: SelectSubset<T, CheckoutSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CheckoutSession.
     * @param {CheckoutSessionCreateArgs} args - Arguments to create a CheckoutSession.
     * @example
     * // Create one CheckoutSession
     * const CheckoutSession = await prisma.checkoutSession.create({
     *   data: {
     *     // ... data to create a CheckoutSession
     *   }
     * })
     * 
     */
    create<T extends CheckoutSessionCreateArgs>(args: SelectSubset<T, CheckoutSessionCreateArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CheckoutSessions.
     * @param {CheckoutSessionCreateManyArgs} args - Arguments to create many CheckoutSessions.
     * @example
     * // Create many CheckoutSessions
     * const checkoutSession = await prisma.checkoutSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CheckoutSessionCreateManyArgs>(args?: SelectSubset<T, CheckoutSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CheckoutSession.
     * @param {CheckoutSessionDeleteArgs} args - Arguments to delete one CheckoutSession.
     * @example
     * // Delete one CheckoutSession
     * const CheckoutSession = await prisma.checkoutSession.delete({
     *   where: {
     *     // ... filter to delete one CheckoutSession
     *   }
     * })
     * 
     */
    delete<T extends CheckoutSessionDeleteArgs>(args: SelectSubset<T, CheckoutSessionDeleteArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CheckoutSession.
     * @param {CheckoutSessionUpdateArgs} args - Arguments to update one CheckoutSession.
     * @example
     * // Update one CheckoutSession
     * const checkoutSession = await prisma.checkoutSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CheckoutSessionUpdateArgs>(args: SelectSubset<T, CheckoutSessionUpdateArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CheckoutSessions.
     * @param {CheckoutSessionDeleteManyArgs} args - Arguments to filter CheckoutSessions to delete.
     * @example
     * // Delete a few CheckoutSessions
     * const { count } = await prisma.checkoutSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CheckoutSessionDeleteManyArgs>(args?: SelectSubset<T, CheckoutSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CheckoutSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CheckoutSessions
     * const checkoutSession = await prisma.checkoutSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CheckoutSessionUpdateManyArgs>(args: SelectSubset<T, CheckoutSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CheckoutSession.
     * @param {CheckoutSessionUpsertArgs} args - Arguments to update or create a CheckoutSession.
     * @example
     * // Update or create a CheckoutSession
     * const checkoutSession = await prisma.checkoutSession.upsert({
     *   create: {
     *     // ... data to create a CheckoutSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CheckoutSession we want to update
     *   }
     * })
     */
    upsert<T extends CheckoutSessionUpsertArgs>(args: SelectSubset<T, CheckoutSessionUpsertArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CheckoutSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSessionCountArgs} args - Arguments to filter CheckoutSessions to count.
     * @example
     * // Count the number of CheckoutSessions
     * const count = await prisma.checkoutSession.count({
     *   where: {
     *     // ... the filter for the CheckoutSessions we want to count
     *   }
     * })
    **/
    count<T extends CheckoutSessionCountArgs>(
      args?: Subset<T, CheckoutSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CheckoutSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CheckoutSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CheckoutSessionAggregateArgs>(args: Subset<T, CheckoutSessionAggregateArgs>): Prisma.PrismaPromise<GetCheckoutSessionAggregateType<T>>

    /**
     * Group by CheckoutSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CheckoutSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CheckoutSessionGroupByArgs['orderBy'] }
        : { orderBy?: CheckoutSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CheckoutSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCheckoutSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CheckoutSession model
   */
  readonly fields: CheckoutSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CheckoutSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CheckoutSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cart<T extends CheckoutSession$cartArgs<ExtArgs> = {}>(args?: Subset<T, CheckoutSession$cartArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CheckoutSession model
   */
  interface CheckoutSessionFieldRefs {
    readonly id: FieldRef<"CheckoutSession", 'Int'>
    readonly stripeSessionId: FieldRef<"CheckoutSession", 'String'>
    readonly cartId: FieldRef<"CheckoutSession", 'Int'>
    readonly subtotal: FieldRef<"CheckoutSession", 'Int'>
    readonly estimatedTax: FieldRef<"CheckoutSession", 'Int'>
    readonly estimatedShipping: FieldRef<"CheckoutSession", 'Int'>
    readonly promoDiscount: FieldRef<"CheckoutSession", 'Int'>
    readonly estimatedTotal: FieldRef<"CheckoutSession", 'Int'>
    readonly finalTax: FieldRef<"CheckoutSession", 'Int'>
    readonly finalShipping: FieldRef<"CheckoutSession", 'Int'>
    readonly finalTotal: FieldRef<"CheckoutSession", 'Int'>
    readonly status: FieldRef<"CheckoutSession", 'String'>
    readonly stripeEventId: FieldRef<"CheckoutSession", 'String'>
    readonly webhookProcessedAt: FieldRef<"CheckoutSession", 'DateTime'>
    readonly createdAt: FieldRef<"CheckoutSession", 'DateTime'>
    readonly updatedAt: FieldRef<"CheckoutSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CheckoutSession findUnique
   */
  export type CheckoutSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSession
     */
    omit?: CheckoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutSession to fetch.
     */
    where: CheckoutSessionWhereUniqueInput
  }

  /**
   * CheckoutSession findUniqueOrThrow
   */
  export type CheckoutSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSession
     */
    omit?: CheckoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutSession to fetch.
     */
    where: CheckoutSessionWhereUniqueInput
  }

  /**
   * CheckoutSession findFirst
   */
  export type CheckoutSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSession
     */
    omit?: CheckoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutSession to fetch.
     */
    where?: CheckoutSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutSessions to fetch.
     */
    orderBy?: CheckoutSessionOrderByWithRelationInput | CheckoutSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CheckoutSessions.
     */
    cursor?: CheckoutSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CheckoutSessions.
     */
    distinct?: CheckoutSessionScalarFieldEnum | CheckoutSessionScalarFieldEnum[]
  }

  /**
   * CheckoutSession findFirstOrThrow
   */
  export type CheckoutSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSession
     */
    omit?: CheckoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutSession to fetch.
     */
    where?: CheckoutSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutSessions to fetch.
     */
    orderBy?: CheckoutSessionOrderByWithRelationInput | CheckoutSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CheckoutSessions.
     */
    cursor?: CheckoutSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CheckoutSessions.
     */
    distinct?: CheckoutSessionScalarFieldEnum | CheckoutSessionScalarFieldEnum[]
  }

  /**
   * CheckoutSession findMany
   */
  export type CheckoutSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSession
     */
    omit?: CheckoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutSessions to fetch.
     */
    where?: CheckoutSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutSessions to fetch.
     */
    orderBy?: CheckoutSessionOrderByWithRelationInput | CheckoutSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CheckoutSessions.
     */
    cursor?: CheckoutSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutSessions.
     */
    skip?: number
    distinct?: CheckoutSessionScalarFieldEnum | CheckoutSessionScalarFieldEnum[]
  }

  /**
   * CheckoutSession create
   */
  export type CheckoutSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSession
     */
    omit?: CheckoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a CheckoutSession.
     */
    data: XOR<CheckoutSessionCreateInput, CheckoutSessionUncheckedCreateInput>
  }

  /**
   * CheckoutSession createMany
   */
  export type CheckoutSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CheckoutSessions.
     */
    data: CheckoutSessionCreateManyInput | CheckoutSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CheckoutSession update
   */
  export type CheckoutSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSession
     */
    omit?: CheckoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a CheckoutSession.
     */
    data: XOR<CheckoutSessionUpdateInput, CheckoutSessionUncheckedUpdateInput>
    /**
     * Choose, which CheckoutSession to update.
     */
    where: CheckoutSessionWhereUniqueInput
  }

  /**
   * CheckoutSession updateMany
   */
  export type CheckoutSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CheckoutSessions.
     */
    data: XOR<CheckoutSessionUpdateManyMutationInput, CheckoutSessionUncheckedUpdateManyInput>
    /**
     * Filter which CheckoutSessions to update
     */
    where?: CheckoutSessionWhereInput
    /**
     * Limit how many CheckoutSessions to update.
     */
    limit?: number
  }

  /**
   * CheckoutSession upsert
   */
  export type CheckoutSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSession
     */
    omit?: CheckoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the CheckoutSession to update in case it exists.
     */
    where: CheckoutSessionWhereUniqueInput
    /**
     * In case the CheckoutSession found by the `where` argument doesn't exist, create a new CheckoutSession with this data.
     */
    create: XOR<CheckoutSessionCreateInput, CheckoutSessionUncheckedCreateInput>
    /**
     * In case the CheckoutSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CheckoutSessionUpdateInput, CheckoutSessionUncheckedUpdateInput>
  }

  /**
   * CheckoutSession delete
   */
  export type CheckoutSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSession
     */
    omit?: CheckoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * Filter which CheckoutSession to delete.
     */
    where: CheckoutSessionWhereUniqueInput
  }

  /**
   * CheckoutSession deleteMany
   */
  export type CheckoutSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CheckoutSessions to delete
     */
    where?: CheckoutSessionWhereInput
    /**
     * Limit how many CheckoutSessions to delete.
     */
    limit?: number
  }

  /**
   * CheckoutSession.cart
   */
  export type CheckoutSession$cartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    where?: CartWhereInput
  }

  /**
   * CheckoutSession without action
   */
  export type CheckoutSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CheckoutSession
     */
    omit?: CheckoutSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
  }


  /**
   * Model SanitySync
   */

  export type AggregateSanitySync = {
    _count: SanitySyncCountAggregateOutputType | null
    _avg: SanitySyncAvgAggregateOutputType | null
    _sum: SanitySyncSumAggregateOutputType | null
    _min: SanitySyncMinAggregateOutputType | null
    _max: SanitySyncMaxAggregateOutputType | null
  }

  export type SanitySyncAvgAggregateOutputType = {
    id: number | null
  }

  export type SanitySyncSumAggregateOutputType = {
    id: number | null
  }

  export type SanitySyncMinAggregateOutputType = {
    id: number | null
    documentId: string | null
    documentType: string | null
    operation: string | null
    revisionId: string | null
    status: string | null
    errorMessage: string | null
    processedAt: Date | null
    createdAt: Date | null
  }

  export type SanitySyncMaxAggregateOutputType = {
    id: number | null
    documentId: string | null
    documentType: string | null
    operation: string | null
    revisionId: string | null
    status: string | null
    errorMessage: string | null
    processedAt: Date | null
    createdAt: Date | null
  }

  export type SanitySyncCountAggregateOutputType = {
    id: number
    documentId: number
    documentType: number
    operation: number
    revisionId: number
    status: number
    errorMessage: number
    payload: number
    processedAt: number
    createdAt: number
    _all: number
  }


  export type SanitySyncAvgAggregateInputType = {
    id?: true
  }

  export type SanitySyncSumAggregateInputType = {
    id?: true
  }

  export type SanitySyncMinAggregateInputType = {
    id?: true
    documentId?: true
    documentType?: true
    operation?: true
    revisionId?: true
    status?: true
    errorMessage?: true
    processedAt?: true
    createdAt?: true
  }

  export type SanitySyncMaxAggregateInputType = {
    id?: true
    documentId?: true
    documentType?: true
    operation?: true
    revisionId?: true
    status?: true
    errorMessage?: true
    processedAt?: true
    createdAt?: true
  }

  export type SanitySyncCountAggregateInputType = {
    id?: true
    documentId?: true
    documentType?: true
    operation?: true
    revisionId?: true
    status?: true
    errorMessage?: true
    payload?: true
    processedAt?: true
    createdAt?: true
    _all?: true
  }

  export type SanitySyncAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SanitySync to aggregate.
     */
    where?: SanitySyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SanitySyncs to fetch.
     */
    orderBy?: SanitySyncOrderByWithRelationInput | SanitySyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SanitySyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SanitySyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SanitySyncs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SanitySyncs
    **/
    _count?: true | SanitySyncCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SanitySyncAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SanitySyncSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SanitySyncMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SanitySyncMaxAggregateInputType
  }

  export type GetSanitySyncAggregateType<T extends SanitySyncAggregateArgs> = {
        [P in keyof T & keyof AggregateSanitySync]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSanitySync[P]>
      : GetScalarType<T[P], AggregateSanitySync[P]>
  }




  export type SanitySyncGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SanitySyncWhereInput
    orderBy?: SanitySyncOrderByWithAggregationInput | SanitySyncOrderByWithAggregationInput[]
    by: SanitySyncScalarFieldEnum[] | SanitySyncScalarFieldEnum
    having?: SanitySyncScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SanitySyncCountAggregateInputType | true
    _avg?: SanitySyncAvgAggregateInputType
    _sum?: SanitySyncSumAggregateInputType
    _min?: SanitySyncMinAggregateInputType
    _max?: SanitySyncMaxAggregateInputType
  }

  export type SanitySyncGroupByOutputType = {
    id: number
    documentId: string
    documentType: string
    operation: string
    revisionId: string
    status: string
    errorMessage: string | null
    payload: JsonValue | null
    processedAt: Date | null
    createdAt: Date
    _count: SanitySyncCountAggregateOutputType | null
    _avg: SanitySyncAvgAggregateOutputType | null
    _sum: SanitySyncSumAggregateOutputType | null
    _min: SanitySyncMinAggregateOutputType | null
    _max: SanitySyncMaxAggregateOutputType | null
  }

  type GetSanitySyncGroupByPayload<T extends SanitySyncGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SanitySyncGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SanitySyncGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SanitySyncGroupByOutputType[P]>
            : GetScalarType<T[P], SanitySyncGroupByOutputType[P]>
        }
      >
    >


  export type SanitySyncSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    documentType?: boolean
    operation?: boolean
    revisionId?: boolean
    status?: boolean
    errorMessage?: boolean
    payload?: boolean
    processedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sanitySync"]>



  export type SanitySyncSelectScalar = {
    id?: boolean
    documentId?: boolean
    documentType?: boolean
    operation?: boolean
    revisionId?: boolean
    status?: boolean
    errorMessage?: boolean
    payload?: boolean
    processedAt?: boolean
    createdAt?: boolean
  }

  export type SanitySyncOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentId" | "documentType" | "operation" | "revisionId" | "status" | "errorMessage" | "payload" | "processedAt" | "createdAt", ExtArgs["result"]["sanitySync"]>

  export type $SanitySyncPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SanitySync"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      documentId: string
      documentType: string
      operation: string
      revisionId: string
      status: string
      errorMessage: string | null
      payload: Prisma.JsonValue | null
      processedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["sanitySync"]>
    composites: {}
  }

  type SanitySyncGetPayload<S extends boolean | null | undefined | SanitySyncDefaultArgs> = $Result.GetResult<Prisma.$SanitySyncPayload, S>

  type SanitySyncCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SanitySyncFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SanitySyncCountAggregateInputType | true
    }

  export interface SanitySyncDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SanitySync'], meta: { name: 'SanitySync' } }
    /**
     * Find zero or one SanitySync that matches the filter.
     * @param {SanitySyncFindUniqueArgs} args - Arguments to find a SanitySync
     * @example
     * // Get one SanitySync
     * const sanitySync = await prisma.sanitySync.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SanitySyncFindUniqueArgs>(args: SelectSubset<T, SanitySyncFindUniqueArgs<ExtArgs>>): Prisma__SanitySyncClient<$Result.GetResult<Prisma.$SanitySyncPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SanitySync that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SanitySyncFindUniqueOrThrowArgs} args - Arguments to find a SanitySync
     * @example
     * // Get one SanitySync
     * const sanitySync = await prisma.sanitySync.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SanitySyncFindUniqueOrThrowArgs>(args: SelectSubset<T, SanitySyncFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SanitySyncClient<$Result.GetResult<Prisma.$SanitySyncPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SanitySync that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanitySyncFindFirstArgs} args - Arguments to find a SanitySync
     * @example
     * // Get one SanitySync
     * const sanitySync = await prisma.sanitySync.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SanitySyncFindFirstArgs>(args?: SelectSubset<T, SanitySyncFindFirstArgs<ExtArgs>>): Prisma__SanitySyncClient<$Result.GetResult<Prisma.$SanitySyncPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SanitySync that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanitySyncFindFirstOrThrowArgs} args - Arguments to find a SanitySync
     * @example
     * // Get one SanitySync
     * const sanitySync = await prisma.sanitySync.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SanitySyncFindFirstOrThrowArgs>(args?: SelectSubset<T, SanitySyncFindFirstOrThrowArgs<ExtArgs>>): Prisma__SanitySyncClient<$Result.GetResult<Prisma.$SanitySyncPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SanitySyncs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanitySyncFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SanitySyncs
     * const sanitySyncs = await prisma.sanitySync.findMany()
     * 
     * // Get first 10 SanitySyncs
     * const sanitySyncs = await prisma.sanitySync.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sanitySyncWithIdOnly = await prisma.sanitySync.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SanitySyncFindManyArgs>(args?: SelectSubset<T, SanitySyncFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SanitySyncPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SanitySync.
     * @param {SanitySyncCreateArgs} args - Arguments to create a SanitySync.
     * @example
     * // Create one SanitySync
     * const SanitySync = await prisma.sanitySync.create({
     *   data: {
     *     // ... data to create a SanitySync
     *   }
     * })
     * 
     */
    create<T extends SanitySyncCreateArgs>(args: SelectSubset<T, SanitySyncCreateArgs<ExtArgs>>): Prisma__SanitySyncClient<$Result.GetResult<Prisma.$SanitySyncPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SanitySyncs.
     * @param {SanitySyncCreateManyArgs} args - Arguments to create many SanitySyncs.
     * @example
     * // Create many SanitySyncs
     * const sanitySync = await prisma.sanitySync.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SanitySyncCreateManyArgs>(args?: SelectSubset<T, SanitySyncCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SanitySync.
     * @param {SanitySyncDeleteArgs} args - Arguments to delete one SanitySync.
     * @example
     * // Delete one SanitySync
     * const SanitySync = await prisma.sanitySync.delete({
     *   where: {
     *     // ... filter to delete one SanitySync
     *   }
     * })
     * 
     */
    delete<T extends SanitySyncDeleteArgs>(args: SelectSubset<T, SanitySyncDeleteArgs<ExtArgs>>): Prisma__SanitySyncClient<$Result.GetResult<Prisma.$SanitySyncPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SanitySync.
     * @param {SanitySyncUpdateArgs} args - Arguments to update one SanitySync.
     * @example
     * // Update one SanitySync
     * const sanitySync = await prisma.sanitySync.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SanitySyncUpdateArgs>(args: SelectSubset<T, SanitySyncUpdateArgs<ExtArgs>>): Prisma__SanitySyncClient<$Result.GetResult<Prisma.$SanitySyncPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SanitySyncs.
     * @param {SanitySyncDeleteManyArgs} args - Arguments to filter SanitySyncs to delete.
     * @example
     * // Delete a few SanitySyncs
     * const { count } = await prisma.sanitySync.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SanitySyncDeleteManyArgs>(args?: SelectSubset<T, SanitySyncDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SanitySyncs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanitySyncUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SanitySyncs
     * const sanitySync = await prisma.sanitySync.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SanitySyncUpdateManyArgs>(args: SelectSubset<T, SanitySyncUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SanitySync.
     * @param {SanitySyncUpsertArgs} args - Arguments to update or create a SanitySync.
     * @example
     * // Update or create a SanitySync
     * const sanitySync = await prisma.sanitySync.upsert({
     *   create: {
     *     // ... data to create a SanitySync
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SanitySync we want to update
     *   }
     * })
     */
    upsert<T extends SanitySyncUpsertArgs>(args: SelectSubset<T, SanitySyncUpsertArgs<ExtArgs>>): Prisma__SanitySyncClient<$Result.GetResult<Prisma.$SanitySyncPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SanitySyncs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanitySyncCountArgs} args - Arguments to filter SanitySyncs to count.
     * @example
     * // Count the number of SanitySyncs
     * const count = await prisma.sanitySync.count({
     *   where: {
     *     // ... the filter for the SanitySyncs we want to count
     *   }
     * })
    **/
    count<T extends SanitySyncCountArgs>(
      args?: Subset<T, SanitySyncCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SanitySyncCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SanitySync.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanitySyncAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SanitySyncAggregateArgs>(args: Subset<T, SanitySyncAggregateArgs>): Prisma.PrismaPromise<GetSanitySyncAggregateType<T>>

    /**
     * Group by SanitySync.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanitySyncGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SanitySyncGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SanitySyncGroupByArgs['orderBy'] }
        : { orderBy?: SanitySyncGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SanitySyncGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSanitySyncGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SanitySync model
   */
  readonly fields: SanitySyncFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SanitySync.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SanitySyncClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SanitySync model
   */
  interface SanitySyncFieldRefs {
    readonly id: FieldRef<"SanitySync", 'Int'>
    readonly documentId: FieldRef<"SanitySync", 'String'>
    readonly documentType: FieldRef<"SanitySync", 'String'>
    readonly operation: FieldRef<"SanitySync", 'String'>
    readonly revisionId: FieldRef<"SanitySync", 'String'>
    readonly status: FieldRef<"SanitySync", 'String'>
    readonly errorMessage: FieldRef<"SanitySync", 'String'>
    readonly payload: FieldRef<"SanitySync", 'Json'>
    readonly processedAt: FieldRef<"SanitySync", 'DateTime'>
    readonly createdAt: FieldRef<"SanitySync", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SanitySync findUnique
   */
  export type SanitySyncFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SanitySync
     */
    select?: SanitySyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SanitySync
     */
    omit?: SanitySyncOmit<ExtArgs> | null
    /**
     * Filter, which SanitySync to fetch.
     */
    where: SanitySyncWhereUniqueInput
  }

  /**
   * SanitySync findUniqueOrThrow
   */
  export type SanitySyncFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SanitySync
     */
    select?: SanitySyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SanitySync
     */
    omit?: SanitySyncOmit<ExtArgs> | null
    /**
     * Filter, which SanitySync to fetch.
     */
    where: SanitySyncWhereUniqueInput
  }

  /**
   * SanitySync findFirst
   */
  export type SanitySyncFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SanitySync
     */
    select?: SanitySyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SanitySync
     */
    omit?: SanitySyncOmit<ExtArgs> | null
    /**
     * Filter, which SanitySync to fetch.
     */
    where?: SanitySyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SanitySyncs to fetch.
     */
    orderBy?: SanitySyncOrderByWithRelationInput | SanitySyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SanitySyncs.
     */
    cursor?: SanitySyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SanitySyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SanitySyncs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SanitySyncs.
     */
    distinct?: SanitySyncScalarFieldEnum | SanitySyncScalarFieldEnum[]
  }

  /**
   * SanitySync findFirstOrThrow
   */
  export type SanitySyncFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SanitySync
     */
    select?: SanitySyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SanitySync
     */
    omit?: SanitySyncOmit<ExtArgs> | null
    /**
     * Filter, which SanitySync to fetch.
     */
    where?: SanitySyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SanitySyncs to fetch.
     */
    orderBy?: SanitySyncOrderByWithRelationInput | SanitySyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SanitySyncs.
     */
    cursor?: SanitySyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SanitySyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SanitySyncs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SanitySyncs.
     */
    distinct?: SanitySyncScalarFieldEnum | SanitySyncScalarFieldEnum[]
  }

  /**
   * SanitySync findMany
   */
  export type SanitySyncFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SanitySync
     */
    select?: SanitySyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SanitySync
     */
    omit?: SanitySyncOmit<ExtArgs> | null
    /**
     * Filter, which SanitySyncs to fetch.
     */
    where?: SanitySyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SanitySyncs to fetch.
     */
    orderBy?: SanitySyncOrderByWithRelationInput | SanitySyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SanitySyncs.
     */
    cursor?: SanitySyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SanitySyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SanitySyncs.
     */
    skip?: number
    distinct?: SanitySyncScalarFieldEnum | SanitySyncScalarFieldEnum[]
  }

  /**
   * SanitySync create
   */
  export type SanitySyncCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SanitySync
     */
    select?: SanitySyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SanitySync
     */
    omit?: SanitySyncOmit<ExtArgs> | null
    /**
     * The data needed to create a SanitySync.
     */
    data: XOR<SanitySyncCreateInput, SanitySyncUncheckedCreateInput>
  }

  /**
   * SanitySync createMany
   */
  export type SanitySyncCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SanitySyncs.
     */
    data: SanitySyncCreateManyInput | SanitySyncCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SanitySync update
   */
  export type SanitySyncUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SanitySync
     */
    select?: SanitySyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SanitySync
     */
    omit?: SanitySyncOmit<ExtArgs> | null
    /**
     * The data needed to update a SanitySync.
     */
    data: XOR<SanitySyncUpdateInput, SanitySyncUncheckedUpdateInput>
    /**
     * Choose, which SanitySync to update.
     */
    where: SanitySyncWhereUniqueInput
  }

  /**
   * SanitySync updateMany
   */
  export type SanitySyncUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SanitySyncs.
     */
    data: XOR<SanitySyncUpdateManyMutationInput, SanitySyncUncheckedUpdateManyInput>
    /**
     * Filter which SanitySyncs to update
     */
    where?: SanitySyncWhereInput
    /**
     * Limit how many SanitySyncs to update.
     */
    limit?: number
  }

  /**
   * SanitySync upsert
   */
  export type SanitySyncUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SanitySync
     */
    select?: SanitySyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SanitySync
     */
    omit?: SanitySyncOmit<ExtArgs> | null
    /**
     * The filter to search for the SanitySync to update in case it exists.
     */
    where: SanitySyncWhereUniqueInput
    /**
     * In case the SanitySync found by the `where` argument doesn't exist, create a new SanitySync with this data.
     */
    create: XOR<SanitySyncCreateInput, SanitySyncUncheckedCreateInput>
    /**
     * In case the SanitySync was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SanitySyncUpdateInput, SanitySyncUncheckedUpdateInput>
  }

  /**
   * SanitySync delete
   */
  export type SanitySyncDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SanitySync
     */
    select?: SanitySyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SanitySync
     */
    omit?: SanitySyncOmit<ExtArgs> | null
    /**
     * Filter which SanitySync to delete.
     */
    where: SanitySyncWhereUniqueInput
  }

  /**
   * SanitySync deleteMany
   */
  export type SanitySyncDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SanitySyncs to delete
     */
    where?: SanitySyncWhereInput
    /**
     * Limit how many SanitySyncs to delete.
     */
    limit?: number
  }

  /**
   * SanitySync without action
   */
  export type SanitySyncDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SanitySync
     */
    select?: SanitySyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SanitySync
     */
    omit?: SanitySyncOmit<ExtArgs> | null
  }


  /**
   * Model PromoCode
   */

  export type AggregatePromoCode = {
    _count: PromoCodeCountAggregateOutputType | null
    _avg: PromoCodeAvgAggregateOutputType | null
    _sum: PromoCodeSumAggregateOutputType | null
    _min: PromoCodeMinAggregateOutputType | null
    _max: PromoCodeMaxAggregateOutputType | null
  }

  export type PromoCodeAvgAggregateOutputType = {
    id: number | null
    discountCents: number | null
    discountPercentage: number | null
    minOrderAmount: number | null
    maxDiscountAmount: number | null
    maxUses: number | null
    maxUsesPerUser: number | null
    usageCount: number | null
  }

  export type PromoCodeSumAggregateOutputType = {
    id: number | null
    discountCents: number | null
    discountPercentage: number | null
    minOrderAmount: number | null
    maxDiscountAmount: number | null
    maxUses: number | null
    maxUsesPerUser: number | null
    usageCount: number | null
  }

  export type PromoCodeMinAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    description: string | null
    discountCents: number | null
    discountPercentage: number | null
    minOrderAmount: number | null
    maxDiscountAmount: number | null
    maxUses: number | null
    maxUsesPerUser: number | null
    validFrom: Date | null
    validTo: Date | null
    isPublic: boolean | null
    isActive: boolean | null
    isFirstTimeOnly: boolean | null
    usageCount: number | null
    createdBy: string | null
    lastUsedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PromoCodeMaxAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    description: string | null
    discountCents: number | null
    discountPercentage: number | null
    minOrderAmount: number | null
    maxDiscountAmount: number | null
    maxUses: number | null
    maxUsesPerUser: number | null
    validFrom: Date | null
    validTo: Date | null
    isPublic: boolean | null
    isActive: boolean | null
    isFirstTimeOnly: boolean | null
    usageCount: number | null
    createdBy: string | null
    lastUsedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PromoCodeCountAggregateOutputType = {
    id: number
    code: number
    name: number
    description: number
    discountCents: number
    discountPercentage: number
    minOrderAmount: number
    maxDiscountAmount: number
    maxUses: number
    maxUsesPerUser: number
    validFrom: number
    validTo: number
    isPublic: number
    isActive: number
    isFirstTimeOnly: number
    allowedCategories: number
    excludedCategories: number
    allowedProducts: number
    excludedProducts: number
    usageCount: number
    createdBy: number
    lastUsedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PromoCodeAvgAggregateInputType = {
    id?: true
    discountCents?: true
    discountPercentage?: true
    minOrderAmount?: true
    maxDiscountAmount?: true
    maxUses?: true
    maxUsesPerUser?: true
    usageCount?: true
  }

  export type PromoCodeSumAggregateInputType = {
    id?: true
    discountCents?: true
    discountPercentage?: true
    minOrderAmount?: true
    maxDiscountAmount?: true
    maxUses?: true
    maxUsesPerUser?: true
    usageCount?: true
  }

  export type PromoCodeMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    discountCents?: true
    discountPercentage?: true
    minOrderAmount?: true
    maxDiscountAmount?: true
    maxUses?: true
    maxUsesPerUser?: true
    validFrom?: true
    validTo?: true
    isPublic?: true
    isActive?: true
    isFirstTimeOnly?: true
    usageCount?: true
    createdBy?: true
    lastUsedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PromoCodeMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    discountCents?: true
    discountPercentage?: true
    minOrderAmount?: true
    maxDiscountAmount?: true
    maxUses?: true
    maxUsesPerUser?: true
    validFrom?: true
    validTo?: true
    isPublic?: true
    isActive?: true
    isFirstTimeOnly?: true
    usageCount?: true
    createdBy?: true
    lastUsedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PromoCodeCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    discountCents?: true
    discountPercentage?: true
    minOrderAmount?: true
    maxDiscountAmount?: true
    maxUses?: true
    maxUsesPerUser?: true
    validFrom?: true
    validTo?: true
    isPublic?: true
    isActive?: true
    isFirstTimeOnly?: true
    allowedCategories?: true
    excludedCategories?: true
    allowedProducts?: true
    excludedProducts?: true
    usageCount?: true
    createdBy?: true
    lastUsedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PromoCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PromoCode to aggregate.
     */
    where?: PromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodes to fetch.
     */
    orderBy?: PromoCodeOrderByWithRelationInput | PromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PromoCodes
    **/
    _count?: true | PromoCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PromoCodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PromoCodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromoCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromoCodeMaxAggregateInputType
  }

  export type GetPromoCodeAggregateType<T extends PromoCodeAggregateArgs> = {
        [P in keyof T & keyof AggregatePromoCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromoCode[P]>
      : GetScalarType<T[P], AggregatePromoCode[P]>
  }




  export type PromoCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoCodeWhereInput
    orderBy?: PromoCodeOrderByWithAggregationInput | PromoCodeOrderByWithAggregationInput[]
    by: PromoCodeScalarFieldEnum[] | PromoCodeScalarFieldEnum
    having?: PromoCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromoCodeCountAggregateInputType | true
    _avg?: PromoCodeAvgAggregateInputType
    _sum?: PromoCodeSumAggregateInputType
    _min?: PromoCodeMinAggregateInputType
    _max?: PromoCodeMaxAggregateInputType
  }

  export type PromoCodeGroupByOutputType = {
    id: number
    code: string
    name: string | null
    description: string | null
    discountCents: number | null
    discountPercentage: number | null
    minOrderAmount: number
    maxDiscountAmount: number | null
    maxUses: number | null
    maxUsesPerUser: number
    validFrom: Date
    validTo: Date | null
    isPublic: boolean
    isActive: boolean
    isFirstTimeOnly: boolean
    allowedCategories: JsonValue | null
    excludedCategories: JsonValue | null
    allowedProducts: JsonValue | null
    excludedProducts: JsonValue | null
    usageCount: number
    createdBy: string | null
    lastUsedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PromoCodeCountAggregateOutputType | null
    _avg: PromoCodeAvgAggregateOutputType | null
    _sum: PromoCodeSumAggregateOutputType | null
    _min: PromoCodeMinAggregateOutputType | null
    _max: PromoCodeMaxAggregateOutputType | null
  }

  type GetPromoCodeGroupByPayload<T extends PromoCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromoCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromoCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromoCodeGroupByOutputType[P]>
            : GetScalarType<T[P], PromoCodeGroupByOutputType[P]>
        }
      >
    >


  export type PromoCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    discountCents?: boolean
    discountPercentage?: boolean
    minOrderAmount?: boolean
    maxDiscountAmount?: boolean
    maxUses?: boolean
    maxUsesPerUser?: boolean
    validFrom?: boolean
    validTo?: boolean
    isPublic?: boolean
    isActive?: boolean
    isFirstTimeOnly?: boolean
    allowedCategories?: boolean
    excludedCategories?: boolean
    allowedProducts?: boolean
    excludedProducts?: boolean
    usageCount?: boolean
    createdBy?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    carts?: boolean | PromoCode$cartsArgs<ExtArgs>
    orders?: boolean | PromoCode$ordersArgs<ExtArgs>
    userUsages?: boolean | PromoCode$userUsagesArgs<ExtArgs>
    _count?: boolean | PromoCodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["promoCode"]>



  export type PromoCodeSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    discountCents?: boolean
    discountPercentage?: boolean
    minOrderAmount?: boolean
    maxDiscountAmount?: boolean
    maxUses?: boolean
    maxUsesPerUser?: boolean
    validFrom?: boolean
    validTo?: boolean
    isPublic?: boolean
    isActive?: boolean
    isFirstTimeOnly?: boolean
    allowedCategories?: boolean
    excludedCategories?: boolean
    allowedProducts?: boolean
    excludedProducts?: boolean
    usageCount?: boolean
    createdBy?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PromoCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "description" | "discountCents" | "discountPercentage" | "minOrderAmount" | "maxDiscountAmount" | "maxUses" | "maxUsesPerUser" | "validFrom" | "validTo" | "isPublic" | "isActive" | "isFirstTimeOnly" | "allowedCategories" | "excludedCategories" | "allowedProducts" | "excludedProducts" | "usageCount" | "createdBy" | "lastUsedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["promoCode"]>
  export type PromoCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carts?: boolean | PromoCode$cartsArgs<ExtArgs>
    orders?: boolean | PromoCode$ordersArgs<ExtArgs>
    userUsages?: boolean | PromoCode$userUsagesArgs<ExtArgs>
    _count?: boolean | PromoCodeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PromoCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PromoCode"
    objects: {
      carts: Prisma.$CartPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      userUsages: Prisma.$PromoCodeUsagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      name: string | null
      description: string | null
      discountCents: number | null
      discountPercentage: number | null
      minOrderAmount: number
      maxDiscountAmount: number | null
      maxUses: number | null
      maxUsesPerUser: number
      validFrom: Date
      validTo: Date | null
      isPublic: boolean
      isActive: boolean
      isFirstTimeOnly: boolean
      allowedCategories: Prisma.JsonValue | null
      excludedCategories: Prisma.JsonValue | null
      allowedProducts: Prisma.JsonValue | null
      excludedProducts: Prisma.JsonValue | null
      usageCount: number
      createdBy: string | null
      lastUsedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["promoCode"]>
    composites: {}
  }

  type PromoCodeGetPayload<S extends boolean | null | undefined | PromoCodeDefaultArgs> = $Result.GetResult<Prisma.$PromoCodePayload, S>

  type PromoCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PromoCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PromoCodeCountAggregateInputType | true
    }

  export interface PromoCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PromoCode'], meta: { name: 'PromoCode' } }
    /**
     * Find zero or one PromoCode that matches the filter.
     * @param {PromoCodeFindUniqueArgs} args - Arguments to find a PromoCode
     * @example
     * // Get one PromoCode
     * const promoCode = await prisma.promoCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromoCodeFindUniqueArgs>(args: SelectSubset<T, PromoCodeFindUniqueArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PromoCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PromoCodeFindUniqueOrThrowArgs} args - Arguments to find a PromoCode
     * @example
     * // Get one PromoCode
     * const promoCode = await prisma.promoCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromoCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, PromoCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PromoCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeFindFirstArgs} args - Arguments to find a PromoCode
     * @example
     * // Get one PromoCode
     * const promoCode = await prisma.promoCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromoCodeFindFirstArgs>(args?: SelectSubset<T, PromoCodeFindFirstArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PromoCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeFindFirstOrThrowArgs} args - Arguments to find a PromoCode
     * @example
     * // Get one PromoCode
     * const promoCode = await prisma.promoCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromoCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, PromoCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PromoCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PromoCodes
     * const promoCodes = await prisma.promoCode.findMany()
     * 
     * // Get first 10 PromoCodes
     * const promoCodes = await prisma.promoCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const promoCodeWithIdOnly = await prisma.promoCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PromoCodeFindManyArgs>(args?: SelectSubset<T, PromoCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PromoCode.
     * @param {PromoCodeCreateArgs} args - Arguments to create a PromoCode.
     * @example
     * // Create one PromoCode
     * const PromoCode = await prisma.promoCode.create({
     *   data: {
     *     // ... data to create a PromoCode
     *   }
     * })
     * 
     */
    create<T extends PromoCodeCreateArgs>(args: SelectSubset<T, PromoCodeCreateArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PromoCodes.
     * @param {PromoCodeCreateManyArgs} args - Arguments to create many PromoCodes.
     * @example
     * // Create many PromoCodes
     * const promoCode = await prisma.promoCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PromoCodeCreateManyArgs>(args?: SelectSubset<T, PromoCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PromoCode.
     * @param {PromoCodeDeleteArgs} args - Arguments to delete one PromoCode.
     * @example
     * // Delete one PromoCode
     * const PromoCode = await prisma.promoCode.delete({
     *   where: {
     *     // ... filter to delete one PromoCode
     *   }
     * })
     * 
     */
    delete<T extends PromoCodeDeleteArgs>(args: SelectSubset<T, PromoCodeDeleteArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PromoCode.
     * @param {PromoCodeUpdateArgs} args - Arguments to update one PromoCode.
     * @example
     * // Update one PromoCode
     * const promoCode = await prisma.promoCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PromoCodeUpdateArgs>(args: SelectSubset<T, PromoCodeUpdateArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PromoCodes.
     * @param {PromoCodeDeleteManyArgs} args - Arguments to filter PromoCodes to delete.
     * @example
     * // Delete a few PromoCodes
     * const { count } = await prisma.promoCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PromoCodeDeleteManyArgs>(args?: SelectSubset<T, PromoCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PromoCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PromoCodes
     * const promoCode = await prisma.promoCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PromoCodeUpdateManyArgs>(args: SelectSubset<T, PromoCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PromoCode.
     * @param {PromoCodeUpsertArgs} args - Arguments to update or create a PromoCode.
     * @example
     * // Update or create a PromoCode
     * const promoCode = await prisma.promoCode.upsert({
     *   create: {
     *     // ... data to create a PromoCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PromoCode we want to update
     *   }
     * })
     */
    upsert<T extends PromoCodeUpsertArgs>(args: SelectSubset<T, PromoCodeUpsertArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PromoCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeCountArgs} args - Arguments to filter PromoCodes to count.
     * @example
     * // Count the number of PromoCodes
     * const count = await prisma.promoCode.count({
     *   where: {
     *     // ... the filter for the PromoCodes we want to count
     *   }
     * })
    **/
    count<T extends PromoCodeCountArgs>(
      args?: Subset<T, PromoCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromoCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PromoCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PromoCodeAggregateArgs>(args: Subset<T, PromoCodeAggregateArgs>): Prisma.PrismaPromise<GetPromoCodeAggregateType<T>>

    /**
     * Group by PromoCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PromoCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromoCodeGroupByArgs['orderBy'] }
        : { orderBy?: PromoCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PromoCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromoCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PromoCode model
   */
  readonly fields: PromoCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PromoCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromoCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    carts<T extends PromoCode$cartsArgs<ExtArgs> = {}>(args?: Subset<T, PromoCode$cartsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends PromoCode$ordersArgs<ExtArgs> = {}>(args?: Subset<T, PromoCode$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userUsages<T extends PromoCode$userUsagesArgs<ExtArgs> = {}>(args?: Subset<T, PromoCode$userUsagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodeUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PromoCode model
   */
  interface PromoCodeFieldRefs {
    readonly id: FieldRef<"PromoCode", 'Int'>
    readonly code: FieldRef<"PromoCode", 'String'>
    readonly name: FieldRef<"PromoCode", 'String'>
    readonly description: FieldRef<"PromoCode", 'String'>
    readonly discountCents: FieldRef<"PromoCode", 'Int'>
    readonly discountPercentage: FieldRef<"PromoCode", 'Int'>
    readonly minOrderAmount: FieldRef<"PromoCode", 'Int'>
    readonly maxDiscountAmount: FieldRef<"PromoCode", 'Int'>
    readonly maxUses: FieldRef<"PromoCode", 'Int'>
    readonly maxUsesPerUser: FieldRef<"PromoCode", 'Int'>
    readonly validFrom: FieldRef<"PromoCode", 'DateTime'>
    readonly validTo: FieldRef<"PromoCode", 'DateTime'>
    readonly isPublic: FieldRef<"PromoCode", 'Boolean'>
    readonly isActive: FieldRef<"PromoCode", 'Boolean'>
    readonly isFirstTimeOnly: FieldRef<"PromoCode", 'Boolean'>
    readonly allowedCategories: FieldRef<"PromoCode", 'Json'>
    readonly excludedCategories: FieldRef<"PromoCode", 'Json'>
    readonly allowedProducts: FieldRef<"PromoCode", 'Json'>
    readonly excludedProducts: FieldRef<"PromoCode", 'Json'>
    readonly usageCount: FieldRef<"PromoCode", 'Int'>
    readonly createdBy: FieldRef<"PromoCode", 'String'>
    readonly lastUsedAt: FieldRef<"PromoCode", 'DateTime'>
    readonly createdAt: FieldRef<"PromoCode", 'DateTime'>
    readonly updatedAt: FieldRef<"PromoCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PromoCode findUnique
   */
  export type PromoCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCode to fetch.
     */
    where: PromoCodeWhereUniqueInput
  }

  /**
   * PromoCode findUniqueOrThrow
   */
  export type PromoCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCode to fetch.
     */
    where: PromoCodeWhereUniqueInput
  }

  /**
   * PromoCode findFirst
   */
  export type PromoCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCode to fetch.
     */
    where?: PromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodes to fetch.
     */
    orderBy?: PromoCodeOrderByWithRelationInput | PromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PromoCodes.
     */
    cursor?: PromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PromoCodes.
     */
    distinct?: PromoCodeScalarFieldEnum | PromoCodeScalarFieldEnum[]
  }

  /**
   * PromoCode findFirstOrThrow
   */
  export type PromoCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCode to fetch.
     */
    where?: PromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodes to fetch.
     */
    orderBy?: PromoCodeOrderByWithRelationInput | PromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PromoCodes.
     */
    cursor?: PromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PromoCodes.
     */
    distinct?: PromoCodeScalarFieldEnum | PromoCodeScalarFieldEnum[]
  }

  /**
   * PromoCode findMany
   */
  export type PromoCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter, which PromoCodes to fetch.
     */
    where?: PromoCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodes to fetch.
     */
    orderBy?: PromoCodeOrderByWithRelationInput | PromoCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PromoCodes.
     */
    cursor?: PromoCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodes.
     */
    skip?: number
    distinct?: PromoCodeScalarFieldEnum | PromoCodeScalarFieldEnum[]
  }

  /**
   * PromoCode create
   */
  export type PromoCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a PromoCode.
     */
    data: XOR<PromoCodeCreateInput, PromoCodeUncheckedCreateInput>
  }

  /**
   * PromoCode createMany
   */
  export type PromoCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PromoCodes.
     */
    data: PromoCodeCreateManyInput | PromoCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PromoCode update
   */
  export type PromoCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a PromoCode.
     */
    data: XOR<PromoCodeUpdateInput, PromoCodeUncheckedUpdateInput>
    /**
     * Choose, which PromoCode to update.
     */
    where: PromoCodeWhereUniqueInput
  }

  /**
   * PromoCode updateMany
   */
  export type PromoCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PromoCodes.
     */
    data: XOR<PromoCodeUpdateManyMutationInput, PromoCodeUncheckedUpdateManyInput>
    /**
     * Filter which PromoCodes to update
     */
    where?: PromoCodeWhereInput
    /**
     * Limit how many PromoCodes to update.
     */
    limit?: number
  }

  /**
   * PromoCode upsert
   */
  export type PromoCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the PromoCode to update in case it exists.
     */
    where: PromoCodeWhereUniqueInput
    /**
     * In case the PromoCode found by the `where` argument doesn't exist, create a new PromoCode with this data.
     */
    create: XOR<PromoCodeCreateInput, PromoCodeUncheckedCreateInput>
    /**
     * In case the PromoCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromoCodeUpdateInput, PromoCodeUncheckedUpdateInput>
  }

  /**
   * PromoCode delete
   */
  export type PromoCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
    /**
     * Filter which PromoCode to delete.
     */
    where: PromoCodeWhereUniqueInput
  }

  /**
   * PromoCode deleteMany
   */
  export type PromoCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PromoCodes to delete
     */
    where?: PromoCodeWhereInput
    /**
     * Limit how many PromoCodes to delete.
     */
    limit?: number
  }

  /**
   * PromoCode.carts
   */
  export type PromoCode$cartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    where?: CartWhereInput
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    cursor?: CartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * PromoCode.orders
   */
  export type PromoCode$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * PromoCode.userUsages
   */
  export type PromoCode$userUsagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUsage
     */
    select?: PromoCodeUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUsage
     */
    omit?: PromoCodeUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUsageInclude<ExtArgs> | null
    where?: PromoCodeUsageWhereInput
    orderBy?: PromoCodeUsageOrderByWithRelationInput | PromoCodeUsageOrderByWithRelationInput[]
    cursor?: PromoCodeUsageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PromoCodeUsageScalarFieldEnum | PromoCodeUsageScalarFieldEnum[]
  }

  /**
   * PromoCode without action
   */
  export type PromoCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCode
     */
    select?: PromoCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCode
     */
    omit?: PromoCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeInclude<ExtArgs> | null
  }


  /**
   * Model PromoCodeUsage
   */

  export type AggregatePromoCodeUsage = {
    _count: PromoCodeUsageCountAggregateOutputType | null
    _avg: PromoCodeUsageAvgAggregateOutputType | null
    _sum: PromoCodeUsageSumAggregateOutputType | null
    _min: PromoCodeUsageMinAggregateOutputType | null
    _max: PromoCodeUsageMaxAggregateOutputType | null
  }

  export type PromoCodeUsageAvgAggregateOutputType = {
    id: number | null
    promoCodeId: number | null
    orderId: number | null
    discountApplied: number | null
    orderAmount: number | null
  }

  export type PromoCodeUsageSumAggregateOutputType = {
    id: number | null
    promoCodeId: number | null
    orderId: number | null
    discountApplied: number | null
    orderAmount: number | null
  }

  export type PromoCodeUsageMinAggregateOutputType = {
    id: number | null
    promoCodeId: number | null
    userId: string | null
    orderId: number | null
    discountApplied: number | null
    orderAmount: number | null
    status: string | null
    failureReason: string | null
    usedAt: Date | null
  }

  export type PromoCodeUsageMaxAggregateOutputType = {
    id: number | null
    promoCodeId: number | null
    userId: string | null
    orderId: number | null
    discountApplied: number | null
    orderAmount: number | null
    status: string | null
    failureReason: string | null
    usedAt: Date | null
  }

  export type PromoCodeUsageCountAggregateOutputType = {
    id: number
    promoCodeId: number
    userId: number
    orderId: number
    discountApplied: number
    orderAmount: number
    status: number
    failureReason: number
    usedAt: number
    _all: number
  }


  export type PromoCodeUsageAvgAggregateInputType = {
    id?: true
    promoCodeId?: true
    orderId?: true
    discountApplied?: true
    orderAmount?: true
  }

  export type PromoCodeUsageSumAggregateInputType = {
    id?: true
    promoCodeId?: true
    orderId?: true
    discountApplied?: true
    orderAmount?: true
  }

  export type PromoCodeUsageMinAggregateInputType = {
    id?: true
    promoCodeId?: true
    userId?: true
    orderId?: true
    discountApplied?: true
    orderAmount?: true
    status?: true
    failureReason?: true
    usedAt?: true
  }

  export type PromoCodeUsageMaxAggregateInputType = {
    id?: true
    promoCodeId?: true
    userId?: true
    orderId?: true
    discountApplied?: true
    orderAmount?: true
    status?: true
    failureReason?: true
    usedAt?: true
  }

  export type PromoCodeUsageCountAggregateInputType = {
    id?: true
    promoCodeId?: true
    userId?: true
    orderId?: true
    discountApplied?: true
    orderAmount?: true
    status?: true
    failureReason?: true
    usedAt?: true
    _all?: true
  }

  export type PromoCodeUsageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PromoCodeUsage to aggregate.
     */
    where?: PromoCodeUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodeUsages to fetch.
     */
    orderBy?: PromoCodeUsageOrderByWithRelationInput | PromoCodeUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PromoCodeUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodeUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodeUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PromoCodeUsages
    **/
    _count?: true | PromoCodeUsageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PromoCodeUsageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PromoCodeUsageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromoCodeUsageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromoCodeUsageMaxAggregateInputType
  }

  export type GetPromoCodeUsageAggregateType<T extends PromoCodeUsageAggregateArgs> = {
        [P in keyof T & keyof AggregatePromoCodeUsage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromoCodeUsage[P]>
      : GetScalarType<T[P], AggregatePromoCodeUsage[P]>
  }




  export type PromoCodeUsageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoCodeUsageWhereInput
    orderBy?: PromoCodeUsageOrderByWithAggregationInput | PromoCodeUsageOrderByWithAggregationInput[]
    by: PromoCodeUsageScalarFieldEnum[] | PromoCodeUsageScalarFieldEnum
    having?: PromoCodeUsageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromoCodeUsageCountAggregateInputType | true
    _avg?: PromoCodeUsageAvgAggregateInputType
    _sum?: PromoCodeUsageSumAggregateInputType
    _min?: PromoCodeUsageMinAggregateInputType
    _max?: PromoCodeUsageMaxAggregateInputType
  }

  export type PromoCodeUsageGroupByOutputType = {
    id: number
    promoCodeId: number
    userId: string
    orderId: number | null
    discountApplied: number
    orderAmount: number
    status: string
    failureReason: string | null
    usedAt: Date
    _count: PromoCodeUsageCountAggregateOutputType | null
    _avg: PromoCodeUsageAvgAggregateOutputType | null
    _sum: PromoCodeUsageSumAggregateOutputType | null
    _min: PromoCodeUsageMinAggregateOutputType | null
    _max: PromoCodeUsageMaxAggregateOutputType | null
  }

  type GetPromoCodeUsageGroupByPayload<T extends PromoCodeUsageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromoCodeUsageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromoCodeUsageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromoCodeUsageGroupByOutputType[P]>
            : GetScalarType<T[P], PromoCodeUsageGroupByOutputType[P]>
        }
      >
    >


  export type PromoCodeUsageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    promoCodeId?: boolean
    userId?: boolean
    orderId?: boolean
    discountApplied?: boolean
    orderAmount?: boolean
    status?: boolean
    failureReason?: boolean
    usedAt?: boolean
    promoCode?: boolean | PromoCodeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    order?: boolean | PromoCodeUsage$orderArgs<ExtArgs>
  }, ExtArgs["result"]["promoCodeUsage"]>



  export type PromoCodeUsageSelectScalar = {
    id?: boolean
    promoCodeId?: boolean
    userId?: boolean
    orderId?: boolean
    discountApplied?: boolean
    orderAmount?: boolean
    status?: boolean
    failureReason?: boolean
    usedAt?: boolean
  }

  export type PromoCodeUsageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "promoCodeId" | "userId" | "orderId" | "discountApplied" | "orderAmount" | "status" | "failureReason" | "usedAt", ExtArgs["result"]["promoCodeUsage"]>
  export type PromoCodeUsageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promoCode?: boolean | PromoCodeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    order?: boolean | PromoCodeUsage$orderArgs<ExtArgs>
  }

  export type $PromoCodeUsagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PromoCodeUsage"
    objects: {
      promoCode: Prisma.$PromoCodePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      order: Prisma.$OrderPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      promoCodeId: number
      userId: string
      orderId: number | null
      discountApplied: number
      orderAmount: number
      status: string
      failureReason: string | null
      usedAt: Date
    }, ExtArgs["result"]["promoCodeUsage"]>
    composites: {}
  }

  type PromoCodeUsageGetPayload<S extends boolean | null | undefined | PromoCodeUsageDefaultArgs> = $Result.GetResult<Prisma.$PromoCodeUsagePayload, S>

  type PromoCodeUsageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PromoCodeUsageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PromoCodeUsageCountAggregateInputType | true
    }

  export interface PromoCodeUsageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PromoCodeUsage'], meta: { name: 'PromoCodeUsage' } }
    /**
     * Find zero or one PromoCodeUsage that matches the filter.
     * @param {PromoCodeUsageFindUniqueArgs} args - Arguments to find a PromoCodeUsage
     * @example
     * // Get one PromoCodeUsage
     * const promoCodeUsage = await prisma.promoCodeUsage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromoCodeUsageFindUniqueArgs>(args: SelectSubset<T, PromoCodeUsageFindUniqueArgs<ExtArgs>>): Prisma__PromoCodeUsageClient<$Result.GetResult<Prisma.$PromoCodeUsagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PromoCodeUsage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PromoCodeUsageFindUniqueOrThrowArgs} args - Arguments to find a PromoCodeUsage
     * @example
     * // Get one PromoCodeUsage
     * const promoCodeUsage = await prisma.promoCodeUsage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromoCodeUsageFindUniqueOrThrowArgs>(args: SelectSubset<T, PromoCodeUsageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PromoCodeUsageClient<$Result.GetResult<Prisma.$PromoCodeUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PromoCodeUsage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUsageFindFirstArgs} args - Arguments to find a PromoCodeUsage
     * @example
     * // Get one PromoCodeUsage
     * const promoCodeUsage = await prisma.promoCodeUsage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromoCodeUsageFindFirstArgs>(args?: SelectSubset<T, PromoCodeUsageFindFirstArgs<ExtArgs>>): Prisma__PromoCodeUsageClient<$Result.GetResult<Prisma.$PromoCodeUsagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PromoCodeUsage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUsageFindFirstOrThrowArgs} args - Arguments to find a PromoCodeUsage
     * @example
     * // Get one PromoCodeUsage
     * const promoCodeUsage = await prisma.promoCodeUsage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromoCodeUsageFindFirstOrThrowArgs>(args?: SelectSubset<T, PromoCodeUsageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PromoCodeUsageClient<$Result.GetResult<Prisma.$PromoCodeUsagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PromoCodeUsages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUsageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PromoCodeUsages
     * const promoCodeUsages = await prisma.promoCodeUsage.findMany()
     * 
     * // Get first 10 PromoCodeUsages
     * const promoCodeUsages = await prisma.promoCodeUsage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const promoCodeUsageWithIdOnly = await prisma.promoCodeUsage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PromoCodeUsageFindManyArgs>(args?: SelectSubset<T, PromoCodeUsageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoCodeUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PromoCodeUsage.
     * @param {PromoCodeUsageCreateArgs} args - Arguments to create a PromoCodeUsage.
     * @example
     * // Create one PromoCodeUsage
     * const PromoCodeUsage = await prisma.promoCodeUsage.create({
     *   data: {
     *     // ... data to create a PromoCodeUsage
     *   }
     * })
     * 
     */
    create<T extends PromoCodeUsageCreateArgs>(args: SelectSubset<T, PromoCodeUsageCreateArgs<ExtArgs>>): Prisma__PromoCodeUsageClient<$Result.GetResult<Prisma.$PromoCodeUsagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PromoCodeUsages.
     * @param {PromoCodeUsageCreateManyArgs} args - Arguments to create many PromoCodeUsages.
     * @example
     * // Create many PromoCodeUsages
     * const promoCodeUsage = await prisma.promoCodeUsage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PromoCodeUsageCreateManyArgs>(args?: SelectSubset<T, PromoCodeUsageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PromoCodeUsage.
     * @param {PromoCodeUsageDeleteArgs} args - Arguments to delete one PromoCodeUsage.
     * @example
     * // Delete one PromoCodeUsage
     * const PromoCodeUsage = await prisma.promoCodeUsage.delete({
     *   where: {
     *     // ... filter to delete one PromoCodeUsage
     *   }
     * })
     * 
     */
    delete<T extends PromoCodeUsageDeleteArgs>(args: SelectSubset<T, PromoCodeUsageDeleteArgs<ExtArgs>>): Prisma__PromoCodeUsageClient<$Result.GetResult<Prisma.$PromoCodeUsagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PromoCodeUsage.
     * @param {PromoCodeUsageUpdateArgs} args - Arguments to update one PromoCodeUsage.
     * @example
     * // Update one PromoCodeUsage
     * const promoCodeUsage = await prisma.promoCodeUsage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PromoCodeUsageUpdateArgs>(args: SelectSubset<T, PromoCodeUsageUpdateArgs<ExtArgs>>): Prisma__PromoCodeUsageClient<$Result.GetResult<Prisma.$PromoCodeUsagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PromoCodeUsages.
     * @param {PromoCodeUsageDeleteManyArgs} args - Arguments to filter PromoCodeUsages to delete.
     * @example
     * // Delete a few PromoCodeUsages
     * const { count } = await prisma.promoCodeUsage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PromoCodeUsageDeleteManyArgs>(args?: SelectSubset<T, PromoCodeUsageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PromoCodeUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUsageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PromoCodeUsages
     * const promoCodeUsage = await prisma.promoCodeUsage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PromoCodeUsageUpdateManyArgs>(args: SelectSubset<T, PromoCodeUsageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PromoCodeUsage.
     * @param {PromoCodeUsageUpsertArgs} args - Arguments to update or create a PromoCodeUsage.
     * @example
     * // Update or create a PromoCodeUsage
     * const promoCodeUsage = await prisma.promoCodeUsage.upsert({
     *   create: {
     *     // ... data to create a PromoCodeUsage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PromoCodeUsage we want to update
     *   }
     * })
     */
    upsert<T extends PromoCodeUsageUpsertArgs>(args: SelectSubset<T, PromoCodeUsageUpsertArgs<ExtArgs>>): Prisma__PromoCodeUsageClient<$Result.GetResult<Prisma.$PromoCodeUsagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PromoCodeUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUsageCountArgs} args - Arguments to filter PromoCodeUsages to count.
     * @example
     * // Count the number of PromoCodeUsages
     * const count = await prisma.promoCodeUsage.count({
     *   where: {
     *     // ... the filter for the PromoCodeUsages we want to count
     *   }
     * })
    **/
    count<T extends PromoCodeUsageCountArgs>(
      args?: Subset<T, PromoCodeUsageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromoCodeUsageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PromoCodeUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUsageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PromoCodeUsageAggregateArgs>(args: Subset<T, PromoCodeUsageAggregateArgs>): Prisma.PrismaPromise<GetPromoCodeUsageAggregateType<T>>

    /**
     * Group by PromoCodeUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCodeUsageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PromoCodeUsageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromoCodeUsageGroupByArgs['orderBy'] }
        : { orderBy?: PromoCodeUsageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PromoCodeUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromoCodeUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PromoCodeUsage model
   */
  readonly fields: PromoCodeUsageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PromoCodeUsage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromoCodeUsageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    promoCode<T extends PromoCodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PromoCodeDefaultArgs<ExtArgs>>): Prisma__PromoCodeClient<$Result.GetResult<Prisma.$PromoCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    order<T extends PromoCodeUsage$orderArgs<ExtArgs> = {}>(args?: Subset<T, PromoCodeUsage$orderArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PromoCodeUsage model
   */
  interface PromoCodeUsageFieldRefs {
    readonly id: FieldRef<"PromoCodeUsage", 'Int'>
    readonly promoCodeId: FieldRef<"PromoCodeUsage", 'Int'>
    readonly userId: FieldRef<"PromoCodeUsage", 'String'>
    readonly orderId: FieldRef<"PromoCodeUsage", 'Int'>
    readonly discountApplied: FieldRef<"PromoCodeUsage", 'Int'>
    readonly orderAmount: FieldRef<"PromoCodeUsage", 'Int'>
    readonly status: FieldRef<"PromoCodeUsage", 'String'>
    readonly failureReason: FieldRef<"PromoCodeUsage", 'String'>
    readonly usedAt: FieldRef<"PromoCodeUsage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PromoCodeUsage findUnique
   */
  export type PromoCodeUsageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUsage
     */
    select?: PromoCodeUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUsage
     */
    omit?: PromoCodeUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUsageInclude<ExtArgs> | null
    /**
     * Filter, which PromoCodeUsage to fetch.
     */
    where: PromoCodeUsageWhereUniqueInput
  }

  /**
   * PromoCodeUsage findUniqueOrThrow
   */
  export type PromoCodeUsageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUsage
     */
    select?: PromoCodeUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUsage
     */
    omit?: PromoCodeUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUsageInclude<ExtArgs> | null
    /**
     * Filter, which PromoCodeUsage to fetch.
     */
    where: PromoCodeUsageWhereUniqueInput
  }

  /**
   * PromoCodeUsage findFirst
   */
  export type PromoCodeUsageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUsage
     */
    select?: PromoCodeUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUsage
     */
    omit?: PromoCodeUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUsageInclude<ExtArgs> | null
    /**
     * Filter, which PromoCodeUsage to fetch.
     */
    where?: PromoCodeUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodeUsages to fetch.
     */
    orderBy?: PromoCodeUsageOrderByWithRelationInput | PromoCodeUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PromoCodeUsages.
     */
    cursor?: PromoCodeUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodeUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodeUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PromoCodeUsages.
     */
    distinct?: PromoCodeUsageScalarFieldEnum | PromoCodeUsageScalarFieldEnum[]
  }

  /**
   * PromoCodeUsage findFirstOrThrow
   */
  export type PromoCodeUsageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUsage
     */
    select?: PromoCodeUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUsage
     */
    omit?: PromoCodeUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUsageInclude<ExtArgs> | null
    /**
     * Filter, which PromoCodeUsage to fetch.
     */
    where?: PromoCodeUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodeUsages to fetch.
     */
    orderBy?: PromoCodeUsageOrderByWithRelationInput | PromoCodeUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PromoCodeUsages.
     */
    cursor?: PromoCodeUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodeUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodeUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PromoCodeUsages.
     */
    distinct?: PromoCodeUsageScalarFieldEnum | PromoCodeUsageScalarFieldEnum[]
  }

  /**
   * PromoCodeUsage findMany
   */
  export type PromoCodeUsageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUsage
     */
    select?: PromoCodeUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUsage
     */
    omit?: PromoCodeUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUsageInclude<ExtArgs> | null
    /**
     * Filter, which PromoCodeUsages to fetch.
     */
    where?: PromoCodeUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PromoCodeUsages to fetch.
     */
    orderBy?: PromoCodeUsageOrderByWithRelationInput | PromoCodeUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PromoCodeUsages.
     */
    cursor?: PromoCodeUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PromoCodeUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PromoCodeUsages.
     */
    skip?: number
    distinct?: PromoCodeUsageScalarFieldEnum | PromoCodeUsageScalarFieldEnum[]
  }

  /**
   * PromoCodeUsage create
   */
  export type PromoCodeUsageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUsage
     */
    select?: PromoCodeUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUsage
     */
    omit?: PromoCodeUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUsageInclude<ExtArgs> | null
    /**
     * The data needed to create a PromoCodeUsage.
     */
    data: XOR<PromoCodeUsageCreateInput, PromoCodeUsageUncheckedCreateInput>
  }

  /**
   * PromoCodeUsage createMany
   */
  export type PromoCodeUsageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PromoCodeUsages.
     */
    data: PromoCodeUsageCreateManyInput | PromoCodeUsageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PromoCodeUsage update
   */
  export type PromoCodeUsageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUsage
     */
    select?: PromoCodeUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUsage
     */
    omit?: PromoCodeUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUsageInclude<ExtArgs> | null
    /**
     * The data needed to update a PromoCodeUsage.
     */
    data: XOR<PromoCodeUsageUpdateInput, PromoCodeUsageUncheckedUpdateInput>
    /**
     * Choose, which PromoCodeUsage to update.
     */
    where: PromoCodeUsageWhereUniqueInput
  }

  /**
   * PromoCodeUsage updateMany
   */
  export type PromoCodeUsageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PromoCodeUsages.
     */
    data: XOR<PromoCodeUsageUpdateManyMutationInput, PromoCodeUsageUncheckedUpdateManyInput>
    /**
     * Filter which PromoCodeUsages to update
     */
    where?: PromoCodeUsageWhereInput
    /**
     * Limit how many PromoCodeUsages to update.
     */
    limit?: number
  }

  /**
   * PromoCodeUsage upsert
   */
  export type PromoCodeUsageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUsage
     */
    select?: PromoCodeUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUsage
     */
    omit?: PromoCodeUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUsageInclude<ExtArgs> | null
    /**
     * The filter to search for the PromoCodeUsage to update in case it exists.
     */
    where: PromoCodeUsageWhereUniqueInput
    /**
     * In case the PromoCodeUsage found by the `where` argument doesn't exist, create a new PromoCodeUsage with this data.
     */
    create: XOR<PromoCodeUsageCreateInput, PromoCodeUsageUncheckedCreateInput>
    /**
     * In case the PromoCodeUsage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromoCodeUsageUpdateInput, PromoCodeUsageUncheckedUpdateInput>
  }

  /**
   * PromoCodeUsage delete
   */
  export type PromoCodeUsageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUsage
     */
    select?: PromoCodeUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUsage
     */
    omit?: PromoCodeUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUsageInclude<ExtArgs> | null
    /**
     * Filter which PromoCodeUsage to delete.
     */
    where: PromoCodeUsageWhereUniqueInput
  }

  /**
   * PromoCodeUsage deleteMany
   */
  export type PromoCodeUsageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PromoCodeUsages to delete
     */
    where?: PromoCodeUsageWhereInput
    /**
     * Limit how many PromoCodeUsages to delete.
     */
    limit?: number
  }

  /**
   * PromoCodeUsage.order
   */
  export type PromoCodeUsage$orderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
  }

  /**
   * PromoCodeUsage without action
   */
  export type PromoCodeUsageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromoCodeUsage
     */
    select?: PromoCodeUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PromoCodeUsage
     */
    omit?: PromoCodeUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoCodeUsageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    provider: 'provider',
    stripeCustomerId: 'stripeCustomerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isActive: 'isActive'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CartScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tempCartId: 'tempCartId',
    appliedPromoCodeId: 'appliedPromoCodeId',
    promoDiscountAmount: 'promoDiscountAmount',
    promoAppliedAt: 'promoAppliedAt',
    requiresPromoVerification: 'requiresPromoVerification',
    shippingMethod: 'shippingMethod',
    shippingAddressId: 'shippingAddressId',
    stripeCheckoutSessionId: 'stripeCheckoutSessionId',
    checkoutStatus: 'checkoutStatus',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CartScalarFieldEnum = (typeof CartScalarFieldEnum)[keyof typeof CartScalarFieldEnum]


  export const CartItemScalarFieldEnum: {
    id: 'id',
    cartId: 'cartId',
    variantId: 'variantId',
    quantity: 'quantity',
    addedAt: 'addedAt',
    updatedAt: 'updatedAt'
  };

  export type CartItemScalarFieldEnum = (typeof CartItemScalarFieldEnum)[keyof typeof CartItemScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    shippingAddress: 'shippingAddress',
    shippingMethod: 'shippingMethod',
    shippingCost: 'shippingCost',
    stripeSessionId: 'stripeSessionId',
    stripeCustomerId: 'stripeCustomerId',
    paymentIntentId: 'paymentIntentId',
    subtotal: 'subtotal',
    discountAmount: 'discountAmount',
    taxAmount: 'taxAmount',
    amountTotal: 'amountTotal',
    currency: 'currency',
    taxCalculation: 'taxCalculation',
    status: 'status',
    trackingCode: 'trackingCode',
    trackingNumber: 'trackingNumber',
    trackingUrl: 'trackingUrl',
    labelUrl: 'labelUrl',
    deliveryDate: 'deliveryDate',
    deliveryDays: 'deliveryDays',
    methodShipped: 'methodShipped',
    carrier: 'carrier',
    shipmentCost: 'shipmentCost',
    estimatedDelivery: 'estimatedDelivery',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    promoCodeId: 'promoCodeId',
    promoCodeUsed: 'promoCodeUsed',
    promoDiscount: 'promoDiscount',
    addressId: 'addressId',
    refundReason: 'refundReason',
    refundedAt: 'refundedAt',
    firstName: 'firstName',
    lastName: 'lastName',
    orderEmail: 'orderEmail'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    variantId: 'variantId',
    productId: 'productId',
    productTitle: 'productTitle',
    images: 'images',
    variantSize: 'variantSize',
    variantColor: 'variantColor',
    variantSku: 'variantSku',
    unitPrice: 'unitPrice',
    quantity: 'quantity',
    totalPrice: 'totalPrice',
    taxAmount: 'taxAmount',
    taxRate: 'taxRate'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const VariantScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    size: 'size',
    color: 'color',
    stockQuantity: 'stockQuantity',
    sku: 'sku',
    sanityRevisionId: 'sanityRevisionId',
    lastSyncedAt: 'lastSyncedAt',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VariantScalarFieldEnum = (typeof VariantScalarFieldEnum)[keyof typeof VariantScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    slug: 'slug',
    price: 'price',
    images: 'images',
    categories: 'categories',
    sanityRevisionId: 'sanityRevisionId',
    lastSyncedAt: 'lastSyncedAt',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const AddressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    company: 'company',
    line1: 'line1',
    line2: 'line2',
    city: 'city',
    state: 'state',
    country: 'country',
    postalCode: 'postalCode',
    phone: 'phone',
    type: 'type',
    isDefault: 'isDefault',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum]


  export const CheckoutSessionScalarFieldEnum: {
    id: 'id',
    stripeSessionId: 'stripeSessionId',
    cartId: 'cartId',
    subtotal: 'subtotal',
    estimatedTax: 'estimatedTax',
    estimatedShipping: 'estimatedShipping',
    promoDiscount: 'promoDiscount',
    estimatedTotal: 'estimatedTotal',
    finalTax: 'finalTax',
    finalShipping: 'finalShipping',
    finalTotal: 'finalTotal',
    status: 'status',
    stripeEventId: 'stripeEventId',
    webhookProcessedAt: 'webhookProcessedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CheckoutSessionScalarFieldEnum = (typeof CheckoutSessionScalarFieldEnum)[keyof typeof CheckoutSessionScalarFieldEnum]


  export const SanitySyncScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    documentType: 'documentType',
    operation: 'operation',
    revisionId: 'revisionId',
    status: 'status',
    errorMessage: 'errorMessage',
    payload: 'payload',
    processedAt: 'processedAt',
    createdAt: 'createdAt'
  };

  export type SanitySyncScalarFieldEnum = (typeof SanitySyncScalarFieldEnum)[keyof typeof SanitySyncScalarFieldEnum]


  export const PromoCodeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    description: 'description',
    discountCents: 'discountCents',
    discountPercentage: 'discountPercentage',
    minOrderAmount: 'minOrderAmount',
    maxDiscountAmount: 'maxDiscountAmount',
    maxUses: 'maxUses',
    maxUsesPerUser: 'maxUsesPerUser',
    validFrom: 'validFrom',
    validTo: 'validTo',
    isPublic: 'isPublic',
    isActive: 'isActive',
    isFirstTimeOnly: 'isFirstTimeOnly',
    allowedCategories: 'allowedCategories',
    excludedCategories: 'excludedCategories',
    allowedProducts: 'allowedProducts',
    excludedProducts: 'excludedProducts',
    usageCount: 'usageCount',
    createdBy: 'createdBy',
    lastUsedAt: 'lastUsedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PromoCodeScalarFieldEnum = (typeof PromoCodeScalarFieldEnum)[keyof typeof PromoCodeScalarFieldEnum]


  export const PromoCodeUsageScalarFieldEnum: {
    id: 'id',
    promoCodeId: 'promoCodeId',
    userId: 'userId',
    orderId: 'orderId',
    discountApplied: 'discountApplied',
    orderAmount: 'orderAmount',
    status: 'status',
    failureReason: 'failureReason',
    usedAt: 'usedAt'
  };

  export type PromoCodeUsageScalarFieldEnum = (typeof PromoCodeUsageScalarFieldEnum)[keyof typeof PromoCodeUsageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    provider: 'provider',
    stripeCustomerId: 'stripeCustomerId'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const CartOrderByRelevanceFieldEnum: {
    userId: 'userId',
    tempCartId: 'tempCartId',
    shippingMethod: 'shippingMethod',
    stripeCheckoutSessionId: 'stripeCheckoutSessionId',
    checkoutStatus: 'checkoutStatus'
  };

  export type CartOrderByRelevanceFieldEnum = (typeof CartOrderByRelevanceFieldEnum)[keyof typeof CartOrderByRelevanceFieldEnum]


  export const CartItemOrderByRelevanceFieldEnum: {
    variantId: 'variantId'
  };

  export type CartItemOrderByRelevanceFieldEnum = (typeof CartItemOrderByRelevanceFieldEnum)[keyof typeof CartItemOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const OrderOrderByRelevanceFieldEnum: {
    userId: 'userId',
    shippingMethod: 'shippingMethod',
    stripeSessionId: 'stripeSessionId',
    stripeCustomerId: 'stripeCustomerId',
    paymentIntentId: 'paymentIntentId',
    currency: 'currency',
    status: 'status',
    trackingCode: 'trackingCode',
    trackingNumber: 'trackingNumber',
    trackingUrl: 'trackingUrl',
    labelUrl: 'labelUrl',
    methodShipped: 'methodShipped',
    carrier: 'carrier',
    estimatedDelivery: 'estimatedDelivery',
    promoCodeUsed: 'promoCodeUsed',
    refundReason: 'refundReason',
    firstName: 'firstName',
    lastName: 'lastName',
    orderEmail: 'orderEmail'
  };

  export type OrderOrderByRelevanceFieldEnum = (typeof OrderOrderByRelevanceFieldEnum)[keyof typeof OrderOrderByRelevanceFieldEnum]


  export const OrderItemOrderByRelevanceFieldEnum: {
    variantId: 'variantId',
    productId: 'productId',
    productTitle: 'productTitle',
    variantSize: 'variantSize',
    variantColor: 'variantColor',
    variantSku: 'variantSku'
  };

  export type OrderItemOrderByRelevanceFieldEnum = (typeof OrderItemOrderByRelevanceFieldEnum)[keyof typeof OrderItemOrderByRelevanceFieldEnum]


  export const VariantOrderByRelevanceFieldEnum: {
    id: 'id',
    productId: 'productId',
    size: 'size',
    color: 'color',
    sku: 'sku',
    sanityRevisionId: 'sanityRevisionId'
  };

  export type VariantOrderByRelevanceFieldEnum = (typeof VariantOrderByRelevanceFieldEnum)[keyof typeof VariantOrderByRelevanceFieldEnum]


  export const ProductOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    slug: 'slug',
    sanityRevisionId: 'sanityRevisionId'
  };

  export type ProductOrderByRelevanceFieldEnum = (typeof ProductOrderByRelevanceFieldEnum)[keyof typeof ProductOrderByRelevanceFieldEnum]


  export const AddressOrderByRelevanceFieldEnum: {
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    company: 'company',
    line1: 'line1',
    line2: 'line2',
    city: 'city',
    state: 'state',
    country: 'country',
    postalCode: 'postalCode',
    phone: 'phone',
    type: 'type'
  };

  export type AddressOrderByRelevanceFieldEnum = (typeof AddressOrderByRelevanceFieldEnum)[keyof typeof AddressOrderByRelevanceFieldEnum]


  export const CheckoutSessionOrderByRelevanceFieldEnum: {
    stripeSessionId: 'stripeSessionId',
    status: 'status',
    stripeEventId: 'stripeEventId'
  };

  export type CheckoutSessionOrderByRelevanceFieldEnum = (typeof CheckoutSessionOrderByRelevanceFieldEnum)[keyof typeof CheckoutSessionOrderByRelevanceFieldEnum]


  export const SanitySyncOrderByRelevanceFieldEnum: {
    documentId: 'documentId',
    documentType: 'documentType',
    operation: 'operation',
    revisionId: 'revisionId',
    status: 'status',
    errorMessage: 'errorMessage'
  };

  export type SanitySyncOrderByRelevanceFieldEnum = (typeof SanitySyncOrderByRelevanceFieldEnum)[keyof typeof SanitySyncOrderByRelevanceFieldEnum]


  export const PromoCodeOrderByRelevanceFieldEnum: {
    code: 'code',
    name: 'name',
    description: 'description',
    createdBy: 'createdBy'
  };

  export type PromoCodeOrderByRelevanceFieldEnum = (typeof PromoCodeOrderByRelevanceFieldEnum)[keyof typeof PromoCodeOrderByRelevanceFieldEnum]


  export const PromoCodeUsageOrderByRelevanceFieldEnum: {
    userId: 'userId',
    status: 'status',
    failureReason: 'failureReason'
  };

  export type PromoCodeUsageOrderByRelevanceFieldEnum = (typeof PromoCodeUsageOrderByRelevanceFieldEnum)[keyof typeof PromoCodeUsageOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    provider?: StringNullableFilter<"User"> | string | null
    stripeCustomerId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    isActive?: BoolFilter<"User"> | boolean
    cart?: XOR<CartNullableScalarRelationFilter, CartWhereInput> | null
    orders?: OrderListRelationFilter
    addresses?: AddressListRelationFilter
    promoUsages?: PromoCodeUsageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    provider?: SortOrderInput | SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    cart?: CartOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
    addresses?: AddressOrderByRelationAggregateInput
    promoUsages?: PromoCodeUsageOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    stripeCustomerId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    provider?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    isActive?: BoolFilter<"User"> | boolean
    cart?: XOR<CartNullableScalarRelationFilter, CartWhereInput> | null
    orders?: OrderListRelationFilter
    addresses?: AddressListRelationFilter
    promoUsages?: PromoCodeUsageListRelationFilter
  }, "id" | "email" | "stripeCustomerId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    provider?: SortOrderInput | SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    provider?: StringNullableWithAggregatesFilter<"User"> | string | null
    stripeCustomerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type CartWhereInput = {
    AND?: CartWhereInput | CartWhereInput[]
    OR?: CartWhereInput[]
    NOT?: CartWhereInput | CartWhereInput[]
    id?: IntFilter<"Cart"> | number
    userId?: StringNullableFilter<"Cart"> | string | null
    tempCartId?: StringNullableFilter<"Cart"> | string | null
    appliedPromoCodeId?: IntNullableFilter<"Cart"> | number | null
    promoDiscountAmount?: IntNullableFilter<"Cart"> | number | null
    promoAppliedAt?: DateTimeNullableFilter<"Cart"> | Date | string | null
    requiresPromoVerification?: BoolFilter<"Cart"> | boolean
    shippingMethod?: StringNullableFilter<"Cart"> | string | null
    shippingAddressId?: IntNullableFilter<"Cart"> | number | null
    stripeCheckoutSessionId?: StringNullableFilter<"Cart"> | string | null
    checkoutStatus?: StringNullableFilter<"Cart"> | string | null
    expiresAt?: DateTimeNullableFilter<"Cart"> | Date | string | null
    createdAt?: DateTimeFilter<"Cart"> | Date | string
    updatedAt?: DateTimeFilter<"Cart"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    appliedPromoCode?: XOR<PromoCodeNullableScalarRelationFilter, PromoCodeWhereInput> | null
    shippingAddress?: XOR<AddressNullableScalarRelationFilter, AddressWhereInput> | null
    items?: CartItemListRelationFilter
    checkoutSessions?: CheckoutSessionListRelationFilter
  }

  export type CartOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    tempCartId?: SortOrderInput | SortOrder
    appliedPromoCodeId?: SortOrderInput | SortOrder
    promoDiscountAmount?: SortOrderInput | SortOrder
    promoAppliedAt?: SortOrderInput | SortOrder
    requiresPromoVerification?: SortOrder
    shippingMethod?: SortOrderInput | SortOrder
    shippingAddressId?: SortOrderInput | SortOrder
    stripeCheckoutSessionId?: SortOrderInput | SortOrder
    checkoutStatus?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    appliedPromoCode?: PromoCodeOrderByWithRelationInput
    shippingAddress?: AddressOrderByWithRelationInput
    items?: CartItemOrderByRelationAggregateInput
    checkoutSessions?: CheckoutSessionOrderByRelationAggregateInput
    _relevance?: CartOrderByRelevanceInput
  }

  export type CartWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: string
    tempCartId?: string
    stripeCheckoutSessionId?: string
    AND?: CartWhereInput | CartWhereInput[]
    OR?: CartWhereInput[]
    NOT?: CartWhereInput | CartWhereInput[]
    appliedPromoCodeId?: IntNullableFilter<"Cart"> | number | null
    promoDiscountAmount?: IntNullableFilter<"Cart"> | number | null
    promoAppliedAt?: DateTimeNullableFilter<"Cart"> | Date | string | null
    requiresPromoVerification?: BoolFilter<"Cart"> | boolean
    shippingMethod?: StringNullableFilter<"Cart"> | string | null
    shippingAddressId?: IntNullableFilter<"Cart"> | number | null
    checkoutStatus?: StringNullableFilter<"Cart"> | string | null
    expiresAt?: DateTimeNullableFilter<"Cart"> | Date | string | null
    createdAt?: DateTimeFilter<"Cart"> | Date | string
    updatedAt?: DateTimeFilter<"Cart"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    appliedPromoCode?: XOR<PromoCodeNullableScalarRelationFilter, PromoCodeWhereInput> | null
    shippingAddress?: XOR<AddressNullableScalarRelationFilter, AddressWhereInput> | null
    items?: CartItemListRelationFilter
    checkoutSessions?: CheckoutSessionListRelationFilter
  }, "id" | "userId" | "tempCartId" | "stripeCheckoutSessionId">

  export type CartOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    tempCartId?: SortOrderInput | SortOrder
    appliedPromoCodeId?: SortOrderInput | SortOrder
    promoDiscountAmount?: SortOrderInput | SortOrder
    promoAppliedAt?: SortOrderInput | SortOrder
    requiresPromoVerification?: SortOrder
    shippingMethod?: SortOrderInput | SortOrder
    shippingAddressId?: SortOrderInput | SortOrder
    stripeCheckoutSessionId?: SortOrderInput | SortOrder
    checkoutStatus?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CartCountOrderByAggregateInput
    _avg?: CartAvgOrderByAggregateInput
    _max?: CartMaxOrderByAggregateInput
    _min?: CartMinOrderByAggregateInput
    _sum?: CartSumOrderByAggregateInput
  }

  export type CartScalarWhereWithAggregatesInput = {
    AND?: CartScalarWhereWithAggregatesInput | CartScalarWhereWithAggregatesInput[]
    OR?: CartScalarWhereWithAggregatesInput[]
    NOT?: CartScalarWhereWithAggregatesInput | CartScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Cart"> | number
    userId?: StringNullableWithAggregatesFilter<"Cart"> | string | null
    tempCartId?: StringNullableWithAggregatesFilter<"Cart"> | string | null
    appliedPromoCodeId?: IntNullableWithAggregatesFilter<"Cart"> | number | null
    promoDiscountAmount?: IntNullableWithAggregatesFilter<"Cart"> | number | null
    promoAppliedAt?: DateTimeNullableWithAggregatesFilter<"Cart"> | Date | string | null
    requiresPromoVerification?: BoolWithAggregatesFilter<"Cart"> | boolean
    shippingMethod?: StringNullableWithAggregatesFilter<"Cart"> | string | null
    shippingAddressId?: IntNullableWithAggregatesFilter<"Cart"> | number | null
    stripeCheckoutSessionId?: StringNullableWithAggregatesFilter<"Cart"> | string | null
    checkoutStatus?: StringNullableWithAggregatesFilter<"Cart"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Cart"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Cart"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Cart"> | Date | string
  }

  export type CartItemWhereInput = {
    AND?: CartItemWhereInput | CartItemWhereInput[]
    OR?: CartItemWhereInput[]
    NOT?: CartItemWhereInput | CartItemWhereInput[]
    id?: IntFilter<"CartItem"> | number
    cartId?: IntFilter<"CartItem"> | number
    variantId?: StringFilter<"CartItem"> | string
    quantity?: IntFilter<"CartItem"> | number
    addedAt?: DateTimeFilter<"CartItem"> | Date | string
    updatedAt?: DateTimeFilter<"CartItem"> | Date | string
    cart?: XOR<CartScalarRelationFilter, CartWhereInput>
    variant?: XOR<VariantScalarRelationFilter, VariantWhereInput>
  }

  export type CartItemOrderByWithRelationInput = {
    id?: SortOrder
    cartId?: SortOrder
    variantId?: SortOrder
    quantity?: SortOrder
    addedAt?: SortOrder
    updatedAt?: SortOrder
    cart?: CartOrderByWithRelationInput
    variant?: VariantOrderByWithRelationInput
    _relevance?: CartItemOrderByRelevanceInput
  }

  export type CartItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    cartId_variantId?: CartItemCartIdVariantIdCompoundUniqueInput
    AND?: CartItemWhereInput | CartItemWhereInput[]
    OR?: CartItemWhereInput[]
    NOT?: CartItemWhereInput | CartItemWhereInput[]
    cartId?: IntFilter<"CartItem"> | number
    variantId?: StringFilter<"CartItem"> | string
    quantity?: IntFilter<"CartItem"> | number
    addedAt?: DateTimeFilter<"CartItem"> | Date | string
    updatedAt?: DateTimeFilter<"CartItem"> | Date | string
    cart?: XOR<CartScalarRelationFilter, CartWhereInput>
    variant?: XOR<VariantScalarRelationFilter, VariantWhereInput>
  }, "id" | "cartId_variantId">

  export type CartItemOrderByWithAggregationInput = {
    id?: SortOrder
    cartId?: SortOrder
    variantId?: SortOrder
    quantity?: SortOrder
    addedAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CartItemCountOrderByAggregateInput
    _avg?: CartItemAvgOrderByAggregateInput
    _max?: CartItemMaxOrderByAggregateInput
    _min?: CartItemMinOrderByAggregateInput
    _sum?: CartItemSumOrderByAggregateInput
  }

  export type CartItemScalarWhereWithAggregatesInput = {
    AND?: CartItemScalarWhereWithAggregatesInput | CartItemScalarWhereWithAggregatesInput[]
    OR?: CartItemScalarWhereWithAggregatesInput[]
    NOT?: CartItemScalarWhereWithAggregatesInput | CartItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CartItem"> | number
    cartId?: IntWithAggregatesFilter<"CartItem"> | number
    variantId?: StringWithAggregatesFilter<"CartItem"> | string
    quantity?: IntWithAggregatesFilter<"CartItem"> | number
    addedAt?: DateTimeWithAggregatesFilter<"CartItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CartItem"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: IntFilter<"Order"> | number
    userId?: StringFilter<"Order"> | string
    shippingAddress?: JsonFilter<"Order">
    shippingMethod?: StringFilter<"Order"> | string
    shippingCost?: IntFilter<"Order"> | number
    stripeSessionId?: StringFilter<"Order"> | string
    stripeCustomerId?: StringNullableFilter<"Order"> | string | null
    paymentIntentId?: StringFilter<"Order"> | string
    subtotal?: IntFilter<"Order"> | number
    discountAmount?: IntFilter<"Order"> | number
    taxAmount?: IntFilter<"Order"> | number
    amountTotal?: IntFilter<"Order"> | number
    currency?: StringFilter<"Order"> | string
    taxCalculation?: JsonNullableFilter<"Order">
    status?: StringFilter<"Order"> | string
    trackingCode?: StringNullableFilter<"Order"> | string | null
    trackingNumber?: StringNullableFilter<"Order"> | string | null
    trackingUrl?: StringNullableFilter<"Order"> | string | null
    labelUrl?: StringNullableFilter<"Order"> | string | null
    deliveryDate?: DateTimeNullableFilter<"Order"> | Date | string | null
    deliveryDays?: IntNullableFilter<"Order"> | number | null
    methodShipped?: StringNullableFilter<"Order"> | string | null
    carrier?: StringNullableFilter<"Order"> | string | null
    shipmentCost?: IntNullableFilter<"Order"> | number | null
    estimatedDelivery?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    promoCodeId?: IntNullableFilter<"Order"> | number | null
    promoCodeUsed?: StringNullableFilter<"Order"> | string | null
    promoDiscount?: IntNullableFilter<"Order"> | number | null
    addressId?: IntNullableFilter<"Order"> | number | null
    refundReason?: StringNullableFilter<"Order"> | string | null
    refundedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    firstName?: StringFilter<"Order"> | string
    lastName?: StringFilter<"Order"> | string
    orderEmail?: StringFilter<"Order"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    promoCode?: XOR<PromoCodeNullableScalarRelationFilter, PromoCodeWhereInput> | null
    address?: XOR<AddressNullableScalarRelationFilter, AddressWhereInput> | null
    promoUsages?: PromoCodeUsageListRelationFilter
    items?: OrderItemListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    shippingAddress?: SortOrder
    shippingMethod?: SortOrder
    shippingCost?: SortOrder
    stripeSessionId?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    paymentIntentId?: SortOrder
    subtotal?: SortOrder
    discountAmount?: SortOrder
    taxAmount?: SortOrder
    amountTotal?: SortOrder
    currency?: SortOrder
    taxCalculation?: SortOrderInput | SortOrder
    status?: SortOrder
    trackingCode?: SortOrderInput | SortOrder
    trackingNumber?: SortOrderInput | SortOrder
    trackingUrl?: SortOrderInput | SortOrder
    labelUrl?: SortOrderInput | SortOrder
    deliveryDate?: SortOrderInput | SortOrder
    deliveryDays?: SortOrderInput | SortOrder
    methodShipped?: SortOrderInput | SortOrder
    carrier?: SortOrderInput | SortOrder
    shipmentCost?: SortOrderInput | SortOrder
    estimatedDelivery?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    promoCodeId?: SortOrderInput | SortOrder
    promoCodeUsed?: SortOrderInput | SortOrder
    promoDiscount?: SortOrderInput | SortOrder
    addressId?: SortOrderInput | SortOrder
    refundReason?: SortOrderInput | SortOrder
    refundedAt?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    orderEmail?: SortOrder
    user?: UserOrderByWithRelationInput
    promoCode?: PromoCodeOrderByWithRelationInput
    address?: AddressOrderByWithRelationInput
    promoUsages?: PromoCodeUsageOrderByRelationAggregateInput
    items?: OrderItemOrderByRelationAggregateInput
    _relevance?: OrderOrderByRelevanceInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    stripeSessionId?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    userId?: StringFilter<"Order"> | string
    shippingAddress?: JsonFilter<"Order">
    shippingMethod?: StringFilter<"Order"> | string
    shippingCost?: IntFilter<"Order"> | number
    stripeCustomerId?: StringNullableFilter<"Order"> | string | null
    paymentIntentId?: StringFilter<"Order"> | string
    subtotal?: IntFilter<"Order"> | number
    discountAmount?: IntFilter<"Order"> | number
    taxAmount?: IntFilter<"Order"> | number
    amountTotal?: IntFilter<"Order"> | number
    currency?: StringFilter<"Order"> | string
    taxCalculation?: JsonNullableFilter<"Order">
    status?: StringFilter<"Order"> | string
    trackingCode?: StringNullableFilter<"Order"> | string | null
    trackingNumber?: StringNullableFilter<"Order"> | string | null
    trackingUrl?: StringNullableFilter<"Order"> | string | null
    labelUrl?: StringNullableFilter<"Order"> | string | null
    deliveryDate?: DateTimeNullableFilter<"Order"> | Date | string | null
    deliveryDays?: IntNullableFilter<"Order"> | number | null
    methodShipped?: StringNullableFilter<"Order"> | string | null
    carrier?: StringNullableFilter<"Order"> | string | null
    shipmentCost?: IntNullableFilter<"Order"> | number | null
    estimatedDelivery?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    promoCodeId?: IntNullableFilter<"Order"> | number | null
    promoCodeUsed?: StringNullableFilter<"Order"> | string | null
    promoDiscount?: IntNullableFilter<"Order"> | number | null
    addressId?: IntNullableFilter<"Order"> | number | null
    refundReason?: StringNullableFilter<"Order"> | string | null
    refundedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    firstName?: StringFilter<"Order"> | string
    lastName?: StringFilter<"Order"> | string
    orderEmail?: StringFilter<"Order"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    promoCode?: XOR<PromoCodeNullableScalarRelationFilter, PromoCodeWhereInput> | null
    address?: XOR<AddressNullableScalarRelationFilter, AddressWhereInput> | null
    promoUsages?: PromoCodeUsageListRelationFilter
    items?: OrderItemListRelationFilter
  }, "id" | "stripeSessionId">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    shippingAddress?: SortOrder
    shippingMethod?: SortOrder
    shippingCost?: SortOrder
    stripeSessionId?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    paymentIntentId?: SortOrder
    subtotal?: SortOrder
    discountAmount?: SortOrder
    taxAmount?: SortOrder
    amountTotal?: SortOrder
    currency?: SortOrder
    taxCalculation?: SortOrderInput | SortOrder
    status?: SortOrder
    trackingCode?: SortOrderInput | SortOrder
    trackingNumber?: SortOrderInput | SortOrder
    trackingUrl?: SortOrderInput | SortOrder
    labelUrl?: SortOrderInput | SortOrder
    deliveryDate?: SortOrderInput | SortOrder
    deliveryDays?: SortOrderInput | SortOrder
    methodShipped?: SortOrderInput | SortOrder
    carrier?: SortOrderInput | SortOrder
    shipmentCost?: SortOrderInput | SortOrder
    estimatedDelivery?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    promoCodeId?: SortOrderInput | SortOrder
    promoCodeUsed?: SortOrderInput | SortOrder
    promoDiscount?: SortOrderInput | SortOrder
    addressId?: SortOrderInput | SortOrder
    refundReason?: SortOrderInput | SortOrder
    refundedAt?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    orderEmail?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Order"> | number
    userId?: StringWithAggregatesFilter<"Order"> | string
    shippingAddress?: JsonWithAggregatesFilter<"Order">
    shippingMethod?: StringWithAggregatesFilter<"Order"> | string
    shippingCost?: IntWithAggregatesFilter<"Order"> | number
    stripeSessionId?: StringWithAggregatesFilter<"Order"> | string
    stripeCustomerId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    paymentIntentId?: StringWithAggregatesFilter<"Order"> | string
    subtotal?: IntWithAggregatesFilter<"Order"> | number
    discountAmount?: IntWithAggregatesFilter<"Order"> | number
    taxAmount?: IntWithAggregatesFilter<"Order"> | number
    amountTotal?: IntWithAggregatesFilter<"Order"> | number
    currency?: StringWithAggregatesFilter<"Order"> | string
    taxCalculation?: JsonNullableWithAggregatesFilter<"Order">
    status?: StringWithAggregatesFilter<"Order"> | string
    trackingCode?: StringNullableWithAggregatesFilter<"Order"> | string | null
    trackingNumber?: StringNullableWithAggregatesFilter<"Order"> | string | null
    trackingUrl?: StringNullableWithAggregatesFilter<"Order"> | string | null
    labelUrl?: StringNullableWithAggregatesFilter<"Order"> | string | null
    deliveryDate?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    deliveryDays?: IntNullableWithAggregatesFilter<"Order"> | number | null
    methodShipped?: StringNullableWithAggregatesFilter<"Order"> | string | null
    carrier?: StringNullableWithAggregatesFilter<"Order"> | string | null
    shipmentCost?: IntNullableWithAggregatesFilter<"Order"> | number | null
    estimatedDelivery?: StringNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    promoCodeId?: IntNullableWithAggregatesFilter<"Order"> | number | null
    promoCodeUsed?: StringNullableWithAggregatesFilter<"Order"> | string | null
    promoDiscount?: IntNullableWithAggregatesFilter<"Order"> | number | null
    addressId?: IntNullableWithAggregatesFilter<"Order"> | number | null
    refundReason?: StringNullableWithAggregatesFilter<"Order"> | string | null
    refundedAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    firstName?: StringWithAggregatesFilter<"Order"> | string
    lastName?: StringWithAggregatesFilter<"Order"> | string
    orderEmail?: StringWithAggregatesFilter<"Order"> | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: IntFilter<"OrderItem"> | number
    orderId?: IntFilter<"OrderItem"> | number
    variantId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    productTitle?: StringFilter<"OrderItem"> | string
    images?: JsonNullableFilter<"OrderItem">
    variantSize?: StringFilter<"OrderItem"> | string
    variantColor?: StringFilter<"OrderItem"> | string
    variantSku?: StringNullableFilter<"OrderItem"> | string | null
    unitPrice?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    totalPrice?: IntFilter<"OrderItem"> | number
    taxAmount?: IntNullableFilter<"OrderItem"> | number | null
    taxRate?: FloatNullableFilter<"OrderItem"> | number | null
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    variant?: XOR<VariantScalarRelationFilter, VariantWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    variantId?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    images?: SortOrderInput | SortOrder
    variantSize?: SortOrder
    variantColor?: SortOrder
    variantSku?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    totalPrice?: SortOrder
    taxAmount?: SortOrderInput | SortOrder
    taxRate?: SortOrderInput | SortOrder
    order?: OrderOrderByWithRelationInput
    variant?: VariantOrderByWithRelationInput
    _relevance?: OrderItemOrderByRelevanceInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: IntFilter<"OrderItem"> | number
    variantId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    productTitle?: StringFilter<"OrderItem"> | string
    images?: JsonNullableFilter<"OrderItem">
    variantSize?: StringFilter<"OrderItem"> | string
    variantColor?: StringFilter<"OrderItem"> | string
    variantSku?: StringNullableFilter<"OrderItem"> | string | null
    unitPrice?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    totalPrice?: IntFilter<"OrderItem"> | number
    taxAmount?: IntNullableFilter<"OrderItem"> | number | null
    taxRate?: FloatNullableFilter<"OrderItem"> | number | null
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    variant?: XOR<VariantScalarRelationFilter, VariantWhereInput>
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    variantId?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    images?: SortOrderInput | SortOrder
    variantSize?: SortOrder
    variantColor?: SortOrder
    variantSku?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    totalPrice?: SortOrder
    taxAmount?: SortOrderInput | SortOrder
    taxRate?: SortOrderInput | SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OrderItem"> | number
    orderId?: IntWithAggregatesFilter<"OrderItem"> | number
    variantId?: StringWithAggregatesFilter<"OrderItem"> | string
    productId?: StringWithAggregatesFilter<"OrderItem"> | string
    productTitle?: StringWithAggregatesFilter<"OrderItem"> | string
    images?: JsonNullableWithAggregatesFilter<"OrderItem">
    variantSize?: StringWithAggregatesFilter<"OrderItem"> | string
    variantColor?: StringWithAggregatesFilter<"OrderItem"> | string
    variantSku?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
    unitPrice?: IntWithAggregatesFilter<"OrderItem"> | number
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    totalPrice?: IntWithAggregatesFilter<"OrderItem"> | number
    taxAmount?: IntNullableWithAggregatesFilter<"OrderItem"> | number | null
    taxRate?: FloatNullableWithAggregatesFilter<"OrderItem"> | number | null
  }

  export type VariantWhereInput = {
    AND?: VariantWhereInput | VariantWhereInput[]
    OR?: VariantWhereInput[]
    NOT?: VariantWhereInput | VariantWhereInput[]
    id?: StringFilter<"Variant"> | string
    productId?: StringFilter<"Variant"> | string
    size?: StringFilter<"Variant"> | string
    color?: StringFilter<"Variant"> | string
    stockQuantity?: IntFilter<"Variant"> | number
    sku?: StringNullableFilter<"Variant"> | string | null
    sanityRevisionId?: StringNullableFilter<"Variant"> | string | null
    lastSyncedAt?: DateTimeFilter<"Variant"> | Date | string
    isActive?: BoolFilter<"Variant"> | boolean
    createdAt?: DateTimeFilter<"Variant"> | Date | string
    updatedAt?: DateTimeFilter<"Variant"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    cartItems?: CartItemListRelationFilter
    orderItems?: OrderItemListRelationFilter
  }

  export type VariantOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    size?: SortOrder
    color?: SortOrder
    stockQuantity?: SortOrder
    sku?: SortOrderInput | SortOrder
    sanityRevisionId?: SortOrderInput | SortOrder
    lastSyncedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    cartItems?: CartItemOrderByRelationAggregateInput
    orderItems?: OrderItemOrderByRelationAggregateInput
    _relevance?: VariantOrderByRelevanceInput
  }

  export type VariantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    productId_size_color?: VariantProductIdSizeColorCompoundUniqueInput
    AND?: VariantWhereInput | VariantWhereInput[]
    OR?: VariantWhereInput[]
    NOT?: VariantWhereInput | VariantWhereInput[]
    productId?: StringFilter<"Variant"> | string
    size?: StringFilter<"Variant"> | string
    color?: StringFilter<"Variant"> | string
    stockQuantity?: IntFilter<"Variant"> | number
    sku?: StringNullableFilter<"Variant"> | string | null
    sanityRevisionId?: StringNullableFilter<"Variant"> | string | null
    lastSyncedAt?: DateTimeFilter<"Variant"> | Date | string
    isActive?: BoolFilter<"Variant"> | boolean
    createdAt?: DateTimeFilter<"Variant"> | Date | string
    updatedAt?: DateTimeFilter<"Variant"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    cartItems?: CartItemListRelationFilter
    orderItems?: OrderItemListRelationFilter
  }, "id" | "productId_size_color">

  export type VariantOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    size?: SortOrder
    color?: SortOrder
    stockQuantity?: SortOrder
    sku?: SortOrderInput | SortOrder
    sanityRevisionId?: SortOrderInput | SortOrder
    lastSyncedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VariantCountOrderByAggregateInput
    _avg?: VariantAvgOrderByAggregateInput
    _max?: VariantMaxOrderByAggregateInput
    _min?: VariantMinOrderByAggregateInput
    _sum?: VariantSumOrderByAggregateInput
  }

  export type VariantScalarWhereWithAggregatesInput = {
    AND?: VariantScalarWhereWithAggregatesInput | VariantScalarWhereWithAggregatesInput[]
    OR?: VariantScalarWhereWithAggregatesInput[]
    NOT?: VariantScalarWhereWithAggregatesInput | VariantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Variant"> | string
    productId?: StringWithAggregatesFilter<"Variant"> | string
    size?: StringWithAggregatesFilter<"Variant"> | string
    color?: StringWithAggregatesFilter<"Variant"> | string
    stockQuantity?: IntWithAggregatesFilter<"Variant"> | number
    sku?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    sanityRevisionId?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    lastSyncedAt?: DateTimeWithAggregatesFilter<"Variant"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Variant"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Variant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Variant"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    title?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    slug?: StringFilter<"Product"> | string
    price?: IntNullableFilter<"Product"> | number | null
    images?: JsonNullableFilter<"Product">
    categories?: JsonNullableFilter<"Product">
    sanityRevisionId?: StringNullableFilter<"Product"> | string | null
    lastSyncedAt?: DateTimeFilter<"Product"> | Date | string
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    variants?: VariantListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    slug?: SortOrder
    price?: SortOrderInput | SortOrder
    images?: SortOrderInput | SortOrder
    categories?: SortOrderInput | SortOrder
    sanityRevisionId?: SortOrderInput | SortOrder
    lastSyncedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    variants?: VariantOrderByRelationAggregateInput
    _relevance?: ProductOrderByRelevanceInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    title?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: IntNullableFilter<"Product"> | number | null
    images?: JsonNullableFilter<"Product">
    categories?: JsonNullableFilter<"Product">
    sanityRevisionId?: StringNullableFilter<"Product"> | string | null
    lastSyncedAt?: DateTimeFilter<"Product"> | Date | string
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    variants?: VariantListRelationFilter
  }, "id" | "slug">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    slug?: SortOrder
    price?: SortOrderInput | SortOrder
    images?: SortOrderInput | SortOrder
    categories?: SortOrderInput | SortOrder
    sanityRevisionId?: SortOrderInput | SortOrder
    lastSyncedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    title?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    slug?: StringWithAggregatesFilter<"Product"> | string
    price?: IntNullableWithAggregatesFilter<"Product"> | number | null
    images?: JsonNullableWithAggregatesFilter<"Product">
    categories?: JsonNullableWithAggregatesFilter<"Product">
    sanityRevisionId?: StringNullableWithAggregatesFilter<"Product"> | string | null
    lastSyncedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Product"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type AddressWhereInput = {
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    id?: IntFilter<"Address"> | number
    userId?: StringFilter<"Address"> | string
    firstName?: StringFilter<"Address"> | string
    lastName?: StringFilter<"Address"> | string
    company?: StringNullableFilter<"Address"> | string | null
    line1?: StringFilter<"Address"> | string
    line2?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    country?: StringFilter<"Address"> | string
    postalCode?: StringFilter<"Address"> | string
    phone?: StringNullableFilter<"Address"> | string | null
    type?: StringFilter<"Address"> | string
    isDefault?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    orders?: OrderListRelationFilter
    carts?: CartListRelationFilter
  }

  export type AddressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    company?: SortOrderInput | SortOrder
    line1?: SortOrder
    line2?: SortOrderInput | SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    phone?: SortOrderInput | SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
    carts?: CartOrderByRelationAggregateInput
    _relevance?: AddressOrderByRelevanceInput
  }

  export type AddressWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    userId?: StringFilter<"Address"> | string
    firstName?: StringFilter<"Address"> | string
    lastName?: StringFilter<"Address"> | string
    company?: StringNullableFilter<"Address"> | string | null
    line1?: StringFilter<"Address"> | string
    line2?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    country?: StringFilter<"Address"> | string
    postalCode?: StringFilter<"Address"> | string
    phone?: StringNullableFilter<"Address"> | string | null
    type?: StringFilter<"Address"> | string
    isDefault?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    orders?: OrderListRelationFilter
    carts?: CartListRelationFilter
  }, "id">

  export type AddressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    company?: SortOrderInput | SortOrder
    line1?: SortOrder
    line2?: SortOrderInput | SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    phone?: SortOrderInput | SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AddressCountOrderByAggregateInput
    _avg?: AddressAvgOrderByAggregateInput
    _max?: AddressMaxOrderByAggregateInput
    _min?: AddressMinOrderByAggregateInput
    _sum?: AddressSumOrderByAggregateInput
  }

  export type AddressScalarWhereWithAggregatesInput = {
    AND?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    OR?: AddressScalarWhereWithAggregatesInput[]
    NOT?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Address"> | number
    userId?: StringWithAggregatesFilter<"Address"> | string
    firstName?: StringWithAggregatesFilter<"Address"> | string
    lastName?: StringWithAggregatesFilter<"Address"> | string
    company?: StringNullableWithAggregatesFilter<"Address"> | string | null
    line1?: StringWithAggregatesFilter<"Address"> | string
    line2?: StringNullableWithAggregatesFilter<"Address"> | string | null
    city?: StringWithAggregatesFilter<"Address"> | string
    state?: StringWithAggregatesFilter<"Address"> | string
    country?: StringWithAggregatesFilter<"Address"> | string
    postalCode?: StringWithAggregatesFilter<"Address"> | string
    phone?: StringNullableWithAggregatesFilter<"Address"> | string | null
    type?: StringWithAggregatesFilter<"Address"> | string
    isDefault?: BoolWithAggregatesFilter<"Address"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string
  }

  export type CheckoutSessionWhereInput = {
    AND?: CheckoutSessionWhereInput | CheckoutSessionWhereInput[]
    OR?: CheckoutSessionWhereInput[]
    NOT?: CheckoutSessionWhereInput | CheckoutSessionWhereInput[]
    id?: IntFilter<"CheckoutSession"> | number
    stripeSessionId?: StringFilter<"CheckoutSession"> | string
    cartId?: IntNullableFilter<"CheckoutSession"> | number | null
    subtotal?: IntFilter<"CheckoutSession"> | number
    estimatedTax?: IntFilter<"CheckoutSession"> | number
    estimatedShipping?: IntFilter<"CheckoutSession"> | number
    promoDiscount?: IntFilter<"CheckoutSession"> | number
    estimatedTotal?: IntFilter<"CheckoutSession"> | number
    finalTax?: IntNullableFilter<"CheckoutSession"> | number | null
    finalShipping?: IntNullableFilter<"CheckoutSession"> | number | null
    finalTotal?: IntNullableFilter<"CheckoutSession"> | number | null
    status?: StringFilter<"CheckoutSession"> | string
    stripeEventId?: StringNullableFilter<"CheckoutSession"> | string | null
    webhookProcessedAt?: DateTimeNullableFilter<"CheckoutSession"> | Date | string | null
    createdAt?: DateTimeFilter<"CheckoutSession"> | Date | string
    updatedAt?: DateTimeFilter<"CheckoutSession"> | Date | string
    cart?: XOR<CartNullableScalarRelationFilter, CartWhereInput> | null
  }

  export type CheckoutSessionOrderByWithRelationInput = {
    id?: SortOrder
    stripeSessionId?: SortOrder
    cartId?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    estimatedTax?: SortOrder
    estimatedShipping?: SortOrder
    promoDiscount?: SortOrder
    estimatedTotal?: SortOrder
    finalTax?: SortOrderInput | SortOrder
    finalShipping?: SortOrderInput | SortOrder
    finalTotal?: SortOrderInput | SortOrder
    status?: SortOrder
    stripeEventId?: SortOrderInput | SortOrder
    webhookProcessedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cart?: CartOrderByWithRelationInput
    _relevance?: CheckoutSessionOrderByRelevanceInput
  }

  export type CheckoutSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    stripeSessionId?: string
    AND?: CheckoutSessionWhereInput | CheckoutSessionWhereInput[]
    OR?: CheckoutSessionWhereInput[]
    NOT?: CheckoutSessionWhereInput | CheckoutSessionWhereInput[]
    cartId?: IntNullableFilter<"CheckoutSession"> | number | null
    subtotal?: IntFilter<"CheckoutSession"> | number
    estimatedTax?: IntFilter<"CheckoutSession"> | number
    estimatedShipping?: IntFilter<"CheckoutSession"> | number
    promoDiscount?: IntFilter<"CheckoutSession"> | number
    estimatedTotal?: IntFilter<"CheckoutSession"> | number
    finalTax?: IntNullableFilter<"CheckoutSession"> | number | null
    finalShipping?: IntNullableFilter<"CheckoutSession"> | number | null
    finalTotal?: IntNullableFilter<"CheckoutSession"> | number | null
    status?: StringFilter<"CheckoutSession"> | string
    stripeEventId?: StringNullableFilter<"CheckoutSession"> | string | null
    webhookProcessedAt?: DateTimeNullableFilter<"CheckoutSession"> | Date | string | null
    createdAt?: DateTimeFilter<"CheckoutSession"> | Date | string
    updatedAt?: DateTimeFilter<"CheckoutSession"> | Date | string
    cart?: XOR<CartNullableScalarRelationFilter, CartWhereInput> | null
  }, "id" | "stripeSessionId">

  export type CheckoutSessionOrderByWithAggregationInput = {
    id?: SortOrder
    stripeSessionId?: SortOrder
    cartId?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    estimatedTax?: SortOrder
    estimatedShipping?: SortOrder
    promoDiscount?: SortOrder
    estimatedTotal?: SortOrder
    finalTax?: SortOrderInput | SortOrder
    finalShipping?: SortOrderInput | SortOrder
    finalTotal?: SortOrderInput | SortOrder
    status?: SortOrder
    stripeEventId?: SortOrderInput | SortOrder
    webhookProcessedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CheckoutSessionCountOrderByAggregateInput
    _avg?: CheckoutSessionAvgOrderByAggregateInput
    _max?: CheckoutSessionMaxOrderByAggregateInput
    _min?: CheckoutSessionMinOrderByAggregateInput
    _sum?: CheckoutSessionSumOrderByAggregateInput
  }

  export type CheckoutSessionScalarWhereWithAggregatesInput = {
    AND?: CheckoutSessionScalarWhereWithAggregatesInput | CheckoutSessionScalarWhereWithAggregatesInput[]
    OR?: CheckoutSessionScalarWhereWithAggregatesInput[]
    NOT?: CheckoutSessionScalarWhereWithAggregatesInput | CheckoutSessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CheckoutSession"> | number
    stripeSessionId?: StringWithAggregatesFilter<"CheckoutSession"> | string
    cartId?: IntNullableWithAggregatesFilter<"CheckoutSession"> | number | null
    subtotal?: IntWithAggregatesFilter<"CheckoutSession"> | number
    estimatedTax?: IntWithAggregatesFilter<"CheckoutSession"> | number
    estimatedShipping?: IntWithAggregatesFilter<"CheckoutSession"> | number
    promoDiscount?: IntWithAggregatesFilter<"CheckoutSession"> | number
    estimatedTotal?: IntWithAggregatesFilter<"CheckoutSession"> | number
    finalTax?: IntNullableWithAggregatesFilter<"CheckoutSession"> | number | null
    finalShipping?: IntNullableWithAggregatesFilter<"CheckoutSession"> | number | null
    finalTotal?: IntNullableWithAggregatesFilter<"CheckoutSession"> | number | null
    status?: StringWithAggregatesFilter<"CheckoutSession"> | string
    stripeEventId?: StringNullableWithAggregatesFilter<"CheckoutSession"> | string | null
    webhookProcessedAt?: DateTimeNullableWithAggregatesFilter<"CheckoutSession"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CheckoutSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CheckoutSession"> | Date | string
  }

  export type SanitySyncWhereInput = {
    AND?: SanitySyncWhereInput | SanitySyncWhereInput[]
    OR?: SanitySyncWhereInput[]
    NOT?: SanitySyncWhereInput | SanitySyncWhereInput[]
    id?: IntFilter<"SanitySync"> | number
    documentId?: StringFilter<"SanitySync"> | string
    documentType?: StringFilter<"SanitySync"> | string
    operation?: StringFilter<"SanitySync"> | string
    revisionId?: StringFilter<"SanitySync"> | string
    status?: StringFilter<"SanitySync"> | string
    errorMessage?: StringNullableFilter<"SanitySync"> | string | null
    payload?: JsonNullableFilter<"SanitySync">
    processedAt?: DateTimeNullableFilter<"SanitySync"> | Date | string | null
    createdAt?: DateTimeFilter<"SanitySync"> | Date | string
  }

  export type SanitySyncOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentType?: SortOrder
    operation?: SortOrder
    revisionId?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    processedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _relevance?: SanitySyncOrderByRelevanceInput
  }

  export type SanitySyncWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SanitySyncWhereInput | SanitySyncWhereInput[]
    OR?: SanitySyncWhereInput[]
    NOT?: SanitySyncWhereInput | SanitySyncWhereInput[]
    documentId?: StringFilter<"SanitySync"> | string
    documentType?: StringFilter<"SanitySync"> | string
    operation?: StringFilter<"SanitySync"> | string
    revisionId?: StringFilter<"SanitySync"> | string
    status?: StringFilter<"SanitySync"> | string
    errorMessage?: StringNullableFilter<"SanitySync"> | string | null
    payload?: JsonNullableFilter<"SanitySync">
    processedAt?: DateTimeNullableFilter<"SanitySync"> | Date | string | null
    createdAt?: DateTimeFilter<"SanitySync"> | Date | string
  }, "id">

  export type SanitySyncOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentType?: SortOrder
    operation?: SortOrder
    revisionId?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    payload?: SortOrderInput | SortOrder
    processedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SanitySyncCountOrderByAggregateInput
    _avg?: SanitySyncAvgOrderByAggregateInput
    _max?: SanitySyncMaxOrderByAggregateInput
    _min?: SanitySyncMinOrderByAggregateInput
    _sum?: SanitySyncSumOrderByAggregateInput
  }

  export type SanitySyncScalarWhereWithAggregatesInput = {
    AND?: SanitySyncScalarWhereWithAggregatesInput | SanitySyncScalarWhereWithAggregatesInput[]
    OR?: SanitySyncScalarWhereWithAggregatesInput[]
    NOT?: SanitySyncScalarWhereWithAggregatesInput | SanitySyncScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SanitySync"> | number
    documentId?: StringWithAggregatesFilter<"SanitySync"> | string
    documentType?: StringWithAggregatesFilter<"SanitySync"> | string
    operation?: StringWithAggregatesFilter<"SanitySync"> | string
    revisionId?: StringWithAggregatesFilter<"SanitySync"> | string
    status?: StringWithAggregatesFilter<"SanitySync"> | string
    errorMessage?: StringNullableWithAggregatesFilter<"SanitySync"> | string | null
    payload?: JsonNullableWithAggregatesFilter<"SanitySync">
    processedAt?: DateTimeNullableWithAggregatesFilter<"SanitySync"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SanitySync"> | Date | string
  }

  export type PromoCodeWhereInput = {
    AND?: PromoCodeWhereInput | PromoCodeWhereInput[]
    OR?: PromoCodeWhereInput[]
    NOT?: PromoCodeWhereInput | PromoCodeWhereInput[]
    id?: IntFilter<"PromoCode"> | number
    code?: StringFilter<"PromoCode"> | string
    name?: StringNullableFilter<"PromoCode"> | string | null
    description?: StringNullableFilter<"PromoCode"> | string | null
    discountCents?: IntNullableFilter<"PromoCode"> | number | null
    discountPercentage?: IntNullableFilter<"PromoCode"> | number | null
    minOrderAmount?: IntFilter<"PromoCode"> | number
    maxDiscountAmount?: IntNullableFilter<"PromoCode"> | number | null
    maxUses?: IntNullableFilter<"PromoCode"> | number | null
    maxUsesPerUser?: IntFilter<"PromoCode"> | number
    validFrom?: DateTimeFilter<"PromoCode"> | Date | string
    validTo?: DateTimeNullableFilter<"PromoCode"> | Date | string | null
    isPublic?: BoolFilter<"PromoCode"> | boolean
    isActive?: BoolFilter<"PromoCode"> | boolean
    isFirstTimeOnly?: BoolFilter<"PromoCode"> | boolean
    allowedCategories?: JsonNullableFilter<"PromoCode">
    excludedCategories?: JsonNullableFilter<"PromoCode">
    allowedProducts?: JsonNullableFilter<"PromoCode">
    excludedProducts?: JsonNullableFilter<"PromoCode">
    usageCount?: IntFilter<"PromoCode"> | number
    createdBy?: StringNullableFilter<"PromoCode"> | string | null
    lastUsedAt?: DateTimeNullableFilter<"PromoCode"> | Date | string | null
    createdAt?: DateTimeFilter<"PromoCode"> | Date | string
    updatedAt?: DateTimeFilter<"PromoCode"> | Date | string
    carts?: CartListRelationFilter
    orders?: OrderListRelationFilter
    userUsages?: PromoCodeUsageListRelationFilter
  }

  export type PromoCodeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    discountCents?: SortOrderInput | SortOrder
    discountPercentage?: SortOrderInput | SortOrder
    minOrderAmount?: SortOrder
    maxDiscountAmount?: SortOrderInput | SortOrder
    maxUses?: SortOrderInput | SortOrder
    maxUsesPerUser?: SortOrder
    validFrom?: SortOrder
    validTo?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    isActive?: SortOrder
    isFirstTimeOnly?: SortOrder
    allowedCategories?: SortOrderInput | SortOrder
    excludedCategories?: SortOrderInput | SortOrder
    allowedProducts?: SortOrderInput | SortOrder
    excludedProducts?: SortOrderInput | SortOrder
    usageCount?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    carts?: CartOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    userUsages?: PromoCodeUsageOrderByRelationAggregateInput
    _relevance?: PromoCodeOrderByRelevanceInput
  }

  export type PromoCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: PromoCodeWhereInput | PromoCodeWhereInput[]
    OR?: PromoCodeWhereInput[]
    NOT?: PromoCodeWhereInput | PromoCodeWhereInput[]
    name?: StringNullableFilter<"PromoCode"> | string | null
    description?: StringNullableFilter<"PromoCode"> | string | null
    discountCents?: IntNullableFilter<"PromoCode"> | number | null
    discountPercentage?: IntNullableFilter<"PromoCode"> | number | null
    minOrderAmount?: IntFilter<"PromoCode"> | number
    maxDiscountAmount?: IntNullableFilter<"PromoCode"> | number | null
    maxUses?: IntNullableFilter<"PromoCode"> | number | null
    maxUsesPerUser?: IntFilter<"PromoCode"> | number
    validFrom?: DateTimeFilter<"PromoCode"> | Date | string
    validTo?: DateTimeNullableFilter<"PromoCode"> | Date | string | null
    isPublic?: BoolFilter<"PromoCode"> | boolean
    isActive?: BoolFilter<"PromoCode"> | boolean
    isFirstTimeOnly?: BoolFilter<"PromoCode"> | boolean
    allowedCategories?: JsonNullableFilter<"PromoCode">
    excludedCategories?: JsonNullableFilter<"PromoCode">
    allowedProducts?: JsonNullableFilter<"PromoCode">
    excludedProducts?: JsonNullableFilter<"PromoCode">
    usageCount?: IntFilter<"PromoCode"> | number
    createdBy?: StringNullableFilter<"PromoCode"> | string | null
    lastUsedAt?: DateTimeNullableFilter<"PromoCode"> | Date | string | null
    createdAt?: DateTimeFilter<"PromoCode"> | Date | string
    updatedAt?: DateTimeFilter<"PromoCode"> | Date | string
    carts?: CartListRelationFilter
    orders?: OrderListRelationFilter
    userUsages?: PromoCodeUsageListRelationFilter
  }, "id" | "code">

  export type PromoCodeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    discountCents?: SortOrderInput | SortOrder
    discountPercentage?: SortOrderInput | SortOrder
    minOrderAmount?: SortOrder
    maxDiscountAmount?: SortOrderInput | SortOrder
    maxUses?: SortOrderInput | SortOrder
    maxUsesPerUser?: SortOrder
    validFrom?: SortOrder
    validTo?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    isActive?: SortOrder
    isFirstTimeOnly?: SortOrder
    allowedCategories?: SortOrderInput | SortOrder
    excludedCategories?: SortOrderInput | SortOrder
    allowedProducts?: SortOrderInput | SortOrder
    excludedProducts?: SortOrderInput | SortOrder
    usageCount?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PromoCodeCountOrderByAggregateInput
    _avg?: PromoCodeAvgOrderByAggregateInput
    _max?: PromoCodeMaxOrderByAggregateInput
    _min?: PromoCodeMinOrderByAggregateInput
    _sum?: PromoCodeSumOrderByAggregateInput
  }

  export type PromoCodeScalarWhereWithAggregatesInput = {
    AND?: PromoCodeScalarWhereWithAggregatesInput | PromoCodeScalarWhereWithAggregatesInput[]
    OR?: PromoCodeScalarWhereWithAggregatesInput[]
    NOT?: PromoCodeScalarWhereWithAggregatesInput | PromoCodeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PromoCode"> | number
    code?: StringWithAggregatesFilter<"PromoCode"> | string
    name?: StringNullableWithAggregatesFilter<"PromoCode"> | string | null
    description?: StringNullableWithAggregatesFilter<"PromoCode"> | string | null
    discountCents?: IntNullableWithAggregatesFilter<"PromoCode"> | number | null
    discountPercentage?: IntNullableWithAggregatesFilter<"PromoCode"> | number | null
    minOrderAmount?: IntWithAggregatesFilter<"PromoCode"> | number
    maxDiscountAmount?: IntNullableWithAggregatesFilter<"PromoCode"> | number | null
    maxUses?: IntNullableWithAggregatesFilter<"PromoCode"> | number | null
    maxUsesPerUser?: IntWithAggregatesFilter<"PromoCode"> | number
    validFrom?: DateTimeWithAggregatesFilter<"PromoCode"> | Date | string
    validTo?: DateTimeNullableWithAggregatesFilter<"PromoCode"> | Date | string | null
    isPublic?: BoolWithAggregatesFilter<"PromoCode"> | boolean
    isActive?: BoolWithAggregatesFilter<"PromoCode"> | boolean
    isFirstTimeOnly?: BoolWithAggregatesFilter<"PromoCode"> | boolean
    allowedCategories?: JsonNullableWithAggregatesFilter<"PromoCode">
    excludedCategories?: JsonNullableWithAggregatesFilter<"PromoCode">
    allowedProducts?: JsonNullableWithAggregatesFilter<"PromoCode">
    excludedProducts?: JsonNullableWithAggregatesFilter<"PromoCode">
    usageCount?: IntWithAggregatesFilter<"PromoCode"> | number
    createdBy?: StringNullableWithAggregatesFilter<"PromoCode"> | string | null
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"PromoCode"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PromoCode"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PromoCode"> | Date | string
  }

  export type PromoCodeUsageWhereInput = {
    AND?: PromoCodeUsageWhereInput | PromoCodeUsageWhereInput[]
    OR?: PromoCodeUsageWhereInput[]
    NOT?: PromoCodeUsageWhereInput | PromoCodeUsageWhereInput[]
    id?: IntFilter<"PromoCodeUsage"> | number
    promoCodeId?: IntFilter<"PromoCodeUsage"> | number
    userId?: StringFilter<"PromoCodeUsage"> | string
    orderId?: IntNullableFilter<"PromoCodeUsage"> | number | null
    discountApplied?: IntFilter<"PromoCodeUsage"> | number
    orderAmount?: IntFilter<"PromoCodeUsage"> | number
    status?: StringFilter<"PromoCodeUsage"> | string
    failureReason?: StringNullableFilter<"PromoCodeUsage"> | string | null
    usedAt?: DateTimeFilter<"PromoCodeUsage"> | Date | string
    promoCode?: XOR<PromoCodeScalarRelationFilter, PromoCodeWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    order?: XOR<OrderNullableScalarRelationFilter, OrderWhereInput> | null
  }

  export type PromoCodeUsageOrderByWithRelationInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    userId?: SortOrder
    orderId?: SortOrderInput | SortOrder
    discountApplied?: SortOrder
    orderAmount?: SortOrder
    status?: SortOrder
    failureReason?: SortOrderInput | SortOrder
    usedAt?: SortOrder
    promoCode?: PromoCodeOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    order?: OrderOrderByWithRelationInput
    _relevance?: PromoCodeUsageOrderByRelevanceInput
  }

  export type PromoCodeUsageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    promoCodeId_orderId?: PromoCodeUsagePromoCodeIdOrderIdCompoundUniqueInput
    AND?: PromoCodeUsageWhereInput | PromoCodeUsageWhereInput[]
    OR?: PromoCodeUsageWhereInput[]
    NOT?: PromoCodeUsageWhereInput | PromoCodeUsageWhereInput[]
    promoCodeId?: IntFilter<"PromoCodeUsage"> | number
    userId?: StringFilter<"PromoCodeUsage"> | string
    orderId?: IntNullableFilter<"PromoCodeUsage"> | number | null
    discountApplied?: IntFilter<"PromoCodeUsage"> | number
    orderAmount?: IntFilter<"PromoCodeUsage"> | number
    status?: StringFilter<"PromoCodeUsage"> | string
    failureReason?: StringNullableFilter<"PromoCodeUsage"> | string | null
    usedAt?: DateTimeFilter<"PromoCodeUsage"> | Date | string
    promoCode?: XOR<PromoCodeScalarRelationFilter, PromoCodeWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    order?: XOR<OrderNullableScalarRelationFilter, OrderWhereInput> | null
  }, "id" | "promoCodeId_orderId">

  export type PromoCodeUsageOrderByWithAggregationInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    userId?: SortOrder
    orderId?: SortOrderInput | SortOrder
    discountApplied?: SortOrder
    orderAmount?: SortOrder
    status?: SortOrder
    failureReason?: SortOrderInput | SortOrder
    usedAt?: SortOrder
    _count?: PromoCodeUsageCountOrderByAggregateInput
    _avg?: PromoCodeUsageAvgOrderByAggregateInput
    _max?: PromoCodeUsageMaxOrderByAggregateInput
    _min?: PromoCodeUsageMinOrderByAggregateInput
    _sum?: PromoCodeUsageSumOrderByAggregateInput
  }

  export type PromoCodeUsageScalarWhereWithAggregatesInput = {
    AND?: PromoCodeUsageScalarWhereWithAggregatesInput | PromoCodeUsageScalarWhereWithAggregatesInput[]
    OR?: PromoCodeUsageScalarWhereWithAggregatesInput[]
    NOT?: PromoCodeUsageScalarWhereWithAggregatesInput | PromoCodeUsageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PromoCodeUsage"> | number
    promoCodeId?: IntWithAggregatesFilter<"PromoCodeUsage"> | number
    userId?: StringWithAggregatesFilter<"PromoCodeUsage"> | string
    orderId?: IntNullableWithAggregatesFilter<"PromoCodeUsage"> | number | null
    discountApplied?: IntWithAggregatesFilter<"PromoCodeUsage"> | number
    orderAmount?: IntWithAggregatesFilter<"PromoCodeUsage"> | number
    status?: StringWithAggregatesFilter<"PromoCodeUsage"> | string
    failureReason?: StringNullableWithAggregatesFilter<"PromoCodeUsage"> | string | null
    usedAt?: DateTimeWithAggregatesFilter<"PromoCodeUsage"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    name?: string | null
    provider?: string | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    cart?: CartCreateNestedOneWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    promoUsages?: PromoCodeUsageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    name?: string | null
    provider?: string | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    cart?: CartUncheckedCreateNestedOneWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    promoUsages?: PromoCodeUsageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    cart?: CartUpdateOneWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    promoUsages?: PromoCodeUsageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    cart?: CartUncheckedUpdateOneWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    promoUsages?: PromoCodeUsageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    name?: string | null
    provider?: string | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CartCreateInput = {
    tempCartId?: string | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutCartInput
    appliedPromoCode?: PromoCodeCreateNestedOneWithoutCartsInput
    shippingAddress?: AddressCreateNestedOneWithoutCartsInput
    items?: CartItemCreateNestedManyWithoutCartInput
    checkoutSessions?: CheckoutSessionCreateNestedManyWithoutCartInput
  }

  export type CartUncheckedCreateInput = {
    id?: number
    userId?: string | null
    tempCartId?: string | null
    appliedPromoCodeId?: number | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    shippingAddressId?: number | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: CartItemUncheckedCreateNestedManyWithoutCartInput
    checkoutSessions?: CheckoutSessionUncheckedCreateNestedManyWithoutCartInput
  }

  export type CartUpdateInput = {
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCartNestedInput
    appliedPromoCode?: PromoCodeUpdateOneWithoutCartsNestedInput
    shippingAddress?: AddressUpdateOneWithoutCartsNestedInput
    items?: CartItemUpdateManyWithoutCartNestedInput
    checkoutSessions?: CheckoutSessionUpdateManyWithoutCartNestedInput
  }

  export type CartUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    appliedPromoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddressId?: NullableIntFieldUpdateOperationsInput | number | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CartItemUncheckedUpdateManyWithoutCartNestedInput
    checkoutSessions?: CheckoutSessionUncheckedUpdateManyWithoutCartNestedInput
  }

  export type CartCreateManyInput = {
    id?: number
    userId?: string | null
    tempCartId?: string | null
    appliedPromoCodeId?: number | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    shippingAddressId?: number | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartUpdateManyMutationInput = {
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    appliedPromoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddressId?: NullableIntFieldUpdateOperationsInput | number | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemCreateInput = {
    quantity: number
    addedAt?: Date | string
    updatedAt?: Date | string
    cart: CartCreateNestedOneWithoutItemsInput
    variant: VariantCreateNestedOneWithoutCartItemsInput
  }

  export type CartItemUncheckedCreateInput = {
    id?: number
    cartId: number
    variantId: string
    quantity: number
    addedAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartItemUpdateInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateOneRequiredWithoutItemsNestedInput
    variant?: VariantUpdateOneRequiredWithoutCartItemsNestedInput
  }

  export type CartItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cartId?: IntFieldUpdateOperationsInput | number
    variantId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemCreateManyInput = {
    id?: number
    cartId: number
    variantId: string
    quantity: number
    addedAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartItemUpdateManyMutationInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cartId?: IntFieldUpdateOperationsInput | number
    variantId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
    user: UserCreateNestedOneWithoutOrdersInput
    promoCode?: PromoCodeCreateNestedOneWithoutOrdersInput
    address?: AddressCreateNestedOneWithoutOrdersInput
    promoUsages?: PromoCodeUsageCreateNestedManyWithoutOrderInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: number
    userId: string
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeId?: number | null
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    addressId?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
    promoUsages?: PromoCodeUsageUncheckedCreateNestedManyWithoutOrderInput
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    promoCode?: PromoCodeUpdateOneWithoutOrdersNestedInput
    address?: AddressUpdateOneWithoutOrdersNestedInput
    promoUsages?: PromoCodeUsageUpdateManyWithoutOrderNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    addressId?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
    promoUsages?: PromoCodeUsageUncheckedUpdateManyWithoutOrderNestedInput
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: number
    userId: string
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeId?: number | null
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    addressId?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
  }

  export type OrderUpdateManyMutationInput = {
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    addressId?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
  }

  export type OrderItemCreateInput = {
    productId: string
    productTitle: string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize: string
    variantColor: string
    variantSku?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    taxAmount?: number | null
    taxRate?: number | null
    order: OrderCreateNestedOneWithoutItemsInput
    variant: VariantCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: number
    orderId: number
    variantId: string
    productId: string
    productTitle: string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize: string
    variantColor: string
    variantSku?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    taxAmount?: number | null
    taxRate?: number | null
  }

  export type OrderItemUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize?: StringFieldUpdateOperationsInput | string
    variantColor?: StringFieldUpdateOperationsInput | string
    variantSku?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    taxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    taxRate?: NullableFloatFieldUpdateOperationsInput | number | null
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    variant?: VariantUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    variantId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize?: StringFieldUpdateOperationsInput | string
    variantColor?: StringFieldUpdateOperationsInput | string
    variantSku?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    taxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    taxRate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type OrderItemCreateManyInput = {
    id?: number
    orderId: number
    variantId: string
    productId: string
    productTitle: string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize: string
    variantColor: string
    variantSku?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    taxAmount?: number | null
    taxRate?: number | null
  }

  export type OrderItemUpdateManyMutationInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize?: StringFieldUpdateOperationsInput | string
    variantColor?: StringFieldUpdateOperationsInput | string
    variantSku?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    taxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    taxRate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    variantId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize?: StringFieldUpdateOperationsInput | string
    variantColor?: StringFieldUpdateOperationsInput | string
    variantSku?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    taxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    taxRate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type VariantCreateInput = {
    id: string
    size: string
    color: string
    stockQuantity: number
    sku?: string | null
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutVariantsInput
    cartItems?: CartItemCreateNestedManyWithoutVariantInput
    orderItems?: OrderItemCreateNestedManyWithoutVariantInput
  }

  export type VariantUncheckedCreateInput = {
    id: string
    productId: string
    size: string
    color: string
    stockQuantity: number
    sku?: string | null
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cartItems?: CartItemUncheckedCreateNestedManyWithoutVariantInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutVariantInput
  }

  export type VariantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
    cartItems?: CartItemUpdateManyWithoutVariantNestedInput
    orderItems?: OrderItemUpdateManyWithoutVariantNestedInput
  }

  export type VariantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cartItems?: CartItemUncheckedUpdateManyWithoutVariantNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type VariantCreateManyInput = {
    id: string
    productId: string
    size: string
    color: string
    stockQuantity: number
    sku?: string | null
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VariantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VariantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id: string
    title: string
    description?: string | null
    slug: string
    price?: number | null
    images?: NullableJsonNullValueInput | InputJsonValue
    categories?: NullableJsonNullValueInput | InputJsonValue
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: VariantCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id: string
    title: string
    description?: string | null
    slug: string
    price?: number | null
    images?: NullableJsonNullValueInput | InputJsonValue
    categories?: NullableJsonNullValueInput | InputJsonValue
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: VariantUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    price?: NullableIntFieldUpdateOperationsInput | number | null
    images?: NullableJsonNullValueInput | InputJsonValue
    categories?: NullableJsonNullValueInput | InputJsonValue
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: VariantUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    price?: NullableIntFieldUpdateOperationsInput | number | null
    images?: NullableJsonNullValueInput | InputJsonValue
    categories?: NullableJsonNullValueInput | InputJsonValue
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: VariantUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id: string
    title: string
    description?: string | null
    slug: string
    price?: number | null
    images?: NullableJsonNullValueInput | InputJsonValue
    categories?: NullableJsonNullValueInput | InputJsonValue
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    price?: NullableIntFieldUpdateOperationsInput | number | null
    images?: NullableJsonNullValueInput | InputJsonValue
    categories?: NullableJsonNullValueInput | InputJsonValue
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    price?: NullableIntFieldUpdateOperationsInput | number | null
    images?: NullableJsonNullValueInput | InputJsonValue
    categories?: NullableJsonNullValueInput | InputJsonValue
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressCreateInput = {
    firstName: string
    lastName: string
    company?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    phone?: string | null
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAddressesInput
    orders?: OrderCreateNestedManyWithoutAddressInput
    carts?: CartCreateNestedManyWithoutShippingAddressInput
  }

  export type AddressUncheckedCreateInput = {
    id?: number
    userId: string
    firstName: string
    lastName: string
    company?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    phone?: string | null
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutAddressInput
    carts?: CartUncheckedCreateNestedManyWithoutShippingAddressInput
  }

  export type AddressUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAddressesNestedInput
    orders?: OrderUpdateManyWithoutAddressNestedInput
    carts?: CartUpdateManyWithoutShippingAddressNestedInput
  }

  export type AddressUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutAddressNestedInput
    carts?: CartUncheckedUpdateManyWithoutShippingAddressNestedInput
  }

  export type AddressCreateManyInput = {
    id?: number
    userId: string
    firstName: string
    lastName: string
    company?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    phone?: string | null
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSessionCreateInput = {
    stripeSessionId: string
    subtotal: number
    estimatedTax: number
    estimatedShipping: number
    promoDiscount: number
    estimatedTotal: number
    finalTax?: number | null
    finalShipping?: number | null
    finalTotal?: number | null
    status?: string
    stripeEventId?: string | null
    webhookProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartCreateNestedOneWithoutCheckoutSessionsInput
  }

  export type CheckoutSessionUncheckedCreateInput = {
    id?: number
    stripeSessionId: string
    cartId?: number | null
    subtotal: number
    estimatedTax: number
    estimatedShipping: number
    promoDiscount: number
    estimatedTotal: number
    finalTax?: number | null
    finalShipping?: number | null
    finalTotal?: number | null
    status?: string
    stripeEventId?: string | null
    webhookProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CheckoutSessionUpdateInput = {
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    estimatedTax?: IntFieldUpdateOperationsInput | number
    estimatedShipping?: IntFieldUpdateOperationsInput | number
    promoDiscount?: IntFieldUpdateOperationsInput | number
    estimatedTotal?: IntFieldUpdateOperationsInput | number
    finalTax?: NullableIntFieldUpdateOperationsInput | number | null
    finalShipping?: NullableIntFieldUpdateOperationsInput | number | null
    finalTotal?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    stripeEventId?: NullableStringFieldUpdateOperationsInput | string | null
    webhookProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateOneWithoutCheckoutSessionsNestedInput
  }

  export type CheckoutSessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    cartId?: NullableIntFieldUpdateOperationsInput | number | null
    subtotal?: IntFieldUpdateOperationsInput | number
    estimatedTax?: IntFieldUpdateOperationsInput | number
    estimatedShipping?: IntFieldUpdateOperationsInput | number
    promoDiscount?: IntFieldUpdateOperationsInput | number
    estimatedTotal?: IntFieldUpdateOperationsInput | number
    finalTax?: NullableIntFieldUpdateOperationsInput | number | null
    finalShipping?: NullableIntFieldUpdateOperationsInput | number | null
    finalTotal?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    stripeEventId?: NullableStringFieldUpdateOperationsInput | string | null
    webhookProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSessionCreateManyInput = {
    id?: number
    stripeSessionId: string
    cartId?: number | null
    subtotal: number
    estimatedTax: number
    estimatedShipping: number
    promoDiscount: number
    estimatedTotal: number
    finalTax?: number | null
    finalShipping?: number | null
    finalTotal?: number | null
    status?: string
    stripeEventId?: string | null
    webhookProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CheckoutSessionUpdateManyMutationInput = {
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    estimatedTax?: IntFieldUpdateOperationsInput | number
    estimatedShipping?: IntFieldUpdateOperationsInput | number
    promoDiscount?: IntFieldUpdateOperationsInput | number
    estimatedTotal?: IntFieldUpdateOperationsInput | number
    finalTax?: NullableIntFieldUpdateOperationsInput | number | null
    finalShipping?: NullableIntFieldUpdateOperationsInput | number | null
    finalTotal?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    stripeEventId?: NullableStringFieldUpdateOperationsInput | string | null
    webhookProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    cartId?: NullableIntFieldUpdateOperationsInput | number | null
    subtotal?: IntFieldUpdateOperationsInput | number
    estimatedTax?: IntFieldUpdateOperationsInput | number
    estimatedShipping?: IntFieldUpdateOperationsInput | number
    promoDiscount?: IntFieldUpdateOperationsInput | number
    estimatedTotal?: IntFieldUpdateOperationsInput | number
    finalTax?: NullableIntFieldUpdateOperationsInput | number | null
    finalShipping?: NullableIntFieldUpdateOperationsInput | number | null
    finalTotal?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    stripeEventId?: NullableStringFieldUpdateOperationsInput | string | null
    webhookProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SanitySyncCreateInput = {
    documentId: string
    documentType: string
    operation: string
    revisionId: string
    status: string
    errorMessage?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SanitySyncUncheckedCreateInput = {
    id?: number
    documentId: string
    documentType: string
    operation: string
    revisionId: string
    status: string
    errorMessage?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SanitySyncUpdateInput = {
    documentId?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    revisionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SanitySyncUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentId?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    revisionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SanitySyncCreateManyInput = {
    id?: number
    documentId: string
    documentType: string
    operation: string
    revisionId: string
    status: string
    errorMessage?: string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    processedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SanitySyncUpdateManyMutationInput = {
    documentId?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    revisionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SanitySyncUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentId?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    revisionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: NullableJsonNullValueInput | InputJsonValue
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeCreateInput = {
    code: string
    name?: string | null
    description?: string | null
    discountCents?: number | null
    discountPercentage?: number | null
    minOrderAmount?: number
    maxDiscountAmount?: number | null
    maxUses?: number | null
    maxUsesPerUser?: number
    validFrom?: Date | string
    validTo?: Date | string | null
    isPublic?: boolean
    isActive?: boolean
    isFirstTimeOnly?: boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: number
    createdBy?: string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    carts?: CartCreateNestedManyWithoutAppliedPromoCodeInput
    orders?: OrderCreateNestedManyWithoutPromoCodeInput
    userUsages?: PromoCodeUsageCreateNestedManyWithoutPromoCodeInput
  }

  export type PromoCodeUncheckedCreateInput = {
    id?: number
    code: string
    name?: string | null
    description?: string | null
    discountCents?: number | null
    discountPercentage?: number | null
    minOrderAmount?: number
    maxDiscountAmount?: number | null
    maxUses?: number | null
    maxUsesPerUser?: number
    validFrom?: Date | string
    validTo?: Date | string | null
    isPublic?: boolean
    isActive?: boolean
    isFirstTimeOnly?: boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: number
    createdBy?: string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    carts?: CartUncheckedCreateNestedManyWithoutAppliedPromoCodeInput
    orders?: OrderUncheckedCreateNestedManyWithoutPromoCodeInput
    userUsages?: PromoCodeUsageUncheckedCreateNestedManyWithoutPromoCodeInput
  }

  export type PromoCodeUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discountCents?: NullableIntFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    minOrderAmount?: IntFieldUpdateOperationsInput | number
    maxDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    maxUsesPerUser?: IntFieldUpdateOperationsInput | number
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFirstTimeOnly?: BoolFieldUpdateOperationsInput | boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    carts?: CartUpdateManyWithoutAppliedPromoCodeNestedInput
    orders?: OrderUpdateManyWithoutPromoCodeNestedInput
    userUsages?: PromoCodeUsageUpdateManyWithoutPromoCodeNestedInput
  }

  export type PromoCodeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discountCents?: NullableIntFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    minOrderAmount?: IntFieldUpdateOperationsInput | number
    maxDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    maxUsesPerUser?: IntFieldUpdateOperationsInput | number
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFirstTimeOnly?: BoolFieldUpdateOperationsInput | boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    carts?: CartUncheckedUpdateManyWithoutAppliedPromoCodeNestedInput
    orders?: OrderUncheckedUpdateManyWithoutPromoCodeNestedInput
    userUsages?: PromoCodeUsageUncheckedUpdateManyWithoutPromoCodeNestedInput
  }

  export type PromoCodeCreateManyInput = {
    id?: number
    code: string
    name?: string | null
    description?: string | null
    discountCents?: number | null
    discountPercentage?: number | null
    minOrderAmount?: number
    maxDiscountAmount?: number | null
    maxUses?: number | null
    maxUsesPerUser?: number
    validFrom?: Date | string
    validTo?: Date | string | null
    isPublic?: boolean
    isActive?: boolean
    isFirstTimeOnly?: boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: number
    createdBy?: string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PromoCodeUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discountCents?: NullableIntFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    minOrderAmount?: IntFieldUpdateOperationsInput | number
    maxDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    maxUsesPerUser?: IntFieldUpdateOperationsInput | number
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFirstTimeOnly?: BoolFieldUpdateOperationsInput | boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discountCents?: NullableIntFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    minOrderAmount?: IntFieldUpdateOperationsInput | number
    maxDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    maxUsesPerUser?: IntFieldUpdateOperationsInput | number
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFirstTimeOnly?: BoolFieldUpdateOperationsInput | boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUsageCreateInput = {
    discountApplied: number
    orderAmount: number
    status: string
    failureReason?: string | null
    usedAt?: Date | string
    promoCode: PromoCodeCreateNestedOneWithoutUserUsagesInput
    user: UserCreateNestedOneWithoutPromoUsagesInput
    order?: OrderCreateNestedOneWithoutPromoUsagesInput
  }

  export type PromoCodeUsageUncheckedCreateInput = {
    id?: number
    promoCodeId: number
    userId: string
    orderId?: number | null
    discountApplied: number
    orderAmount: number
    status: string
    failureReason?: string | null
    usedAt?: Date | string
  }

  export type PromoCodeUsageUpdateInput = {
    discountApplied?: IntFieldUpdateOperationsInput | number
    orderAmount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCode?: PromoCodeUpdateOneRequiredWithoutUserUsagesNestedInput
    user?: UserUpdateOneRequiredWithoutPromoUsagesNestedInput
    order?: OrderUpdateOneWithoutPromoUsagesNestedInput
  }

  export type PromoCodeUsageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    discountApplied?: IntFieldUpdateOperationsInput | number
    orderAmount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUsageCreateManyInput = {
    id?: number
    promoCodeId: number
    userId: string
    orderId?: number | null
    discountApplied: number
    orderAmount: number
    status: string
    failureReason?: string | null
    usedAt?: Date | string
  }

  export type PromoCodeUsageUpdateManyMutationInput = {
    discountApplied?: IntFieldUpdateOperationsInput | number
    orderAmount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUsageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    discountApplied?: IntFieldUpdateOperationsInput | number
    orderAmount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CartNullableScalarRelationFilter = {
    is?: CartWhereInput | null
    isNot?: CartWhereInput | null
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type AddressListRelationFilter = {
    every?: AddressWhereInput
    some?: AddressWhereInput
    none?: AddressWhereInput
  }

  export type PromoCodeUsageListRelationFilter = {
    every?: PromoCodeUsageWhereInput
    some?: PromoCodeUsageWhereInput
    none?: PromoCodeUsageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AddressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PromoCodeUsageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    stripeCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    stripeCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    stripeCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PromoCodeNullableScalarRelationFilter = {
    is?: PromoCodeWhereInput | null
    isNot?: PromoCodeWhereInput | null
  }

  export type AddressNullableScalarRelationFilter = {
    is?: AddressWhereInput | null
    isNot?: AddressWhereInput | null
  }

  export type CartItemListRelationFilter = {
    every?: CartItemWhereInput
    some?: CartItemWhereInput
    none?: CartItemWhereInput
  }

  export type CheckoutSessionListRelationFilter = {
    every?: CheckoutSessionWhereInput
    some?: CheckoutSessionWhereInput
    none?: CheckoutSessionWhereInput
  }

  export type CartItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CheckoutSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CartOrderByRelevanceInput = {
    fields: CartOrderByRelevanceFieldEnum | CartOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CartCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tempCartId?: SortOrder
    appliedPromoCodeId?: SortOrder
    promoDiscountAmount?: SortOrder
    promoAppliedAt?: SortOrder
    requiresPromoVerification?: SortOrder
    shippingMethod?: SortOrder
    shippingAddressId?: SortOrder
    stripeCheckoutSessionId?: SortOrder
    checkoutStatus?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartAvgOrderByAggregateInput = {
    id?: SortOrder
    appliedPromoCodeId?: SortOrder
    promoDiscountAmount?: SortOrder
    shippingAddressId?: SortOrder
  }

  export type CartMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tempCartId?: SortOrder
    appliedPromoCodeId?: SortOrder
    promoDiscountAmount?: SortOrder
    promoAppliedAt?: SortOrder
    requiresPromoVerification?: SortOrder
    shippingMethod?: SortOrder
    shippingAddressId?: SortOrder
    stripeCheckoutSessionId?: SortOrder
    checkoutStatus?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tempCartId?: SortOrder
    appliedPromoCodeId?: SortOrder
    promoDiscountAmount?: SortOrder
    promoAppliedAt?: SortOrder
    requiresPromoVerification?: SortOrder
    shippingMethod?: SortOrder
    shippingAddressId?: SortOrder
    stripeCheckoutSessionId?: SortOrder
    checkoutStatus?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartSumOrderByAggregateInput = {
    id?: SortOrder
    appliedPromoCodeId?: SortOrder
    promoDiscountAmount?: SortOrder
    shippingAddressId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CartScalarRelationFilter = {
    is?: CartWhereInput
    isNot?: CartWhereInput
  }

  export type VariantScalarRelationFilter = {
    is?: VariantWhereInput
    isNot?: VariantWhereInput
  }

  export type CartItemOrderByRelevanceInput = {
    fields: CartItemOrderByRelevanceFieldEnum | CartItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CartItemCartIdVariantIdCompoundUniqueInput = {
    cartId: number
    variantId: string
  }

  export type CartItemCountOrderByAggregateInput = {
    id?: SortOrder
    cartId?: SortOrder
    variantId?: SortOrder
    quantity?: SortOrder
    addedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartItemAvgOrderByAggregateInput = {
    id?: SortOrder
    cartId?: SortOrder
    quantity?: SortOrder
  }

  export type CartItemMaxOrderByAggregateInput = {
    id?: SortOrder
    cartId?: SortOrder
    variantId?: SortOrder
    quantity?: SortOrder
    addedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartItemMinOrderByAggregateInput = {
    id?: SortOrder
    cartId?: SortOrder
    variantId?: SortOrder
    quantity?: SortOrder
    addedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartItemSumOrderByAggregateInput = {
    id?: SortOrder
    cartId?: SortOrder
    quantity?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelevanceInput = {
    fields: OrderOrderByRelevanceFieldEnum | OrderOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    shippingAddress?: SortOrder
    shippingMethod?: SortOrder
    shippingCost?: SortOrder
    stripeSessionId?: SortOrder
    stripeCustomerId?: SortOrder
    paymentIntentId?: SortOrder
    subtotal?: SortOrder
    discountAmount?: SortOrder
    taxAmount?: SortOrder
    amountTotal?: SortOrder
    currency?: SortOrder
    taxCalculation?: SortOrder
    status?: SortOrder
    trackingCode?: SortOrder
    trackingNumber?: SortOrder
    trackingUrl?: SortOrder
    labelUrl?: SortOrder
    deliveryDate?: SortOrder
    deliveryDays?: SortOrder
    methodShipped?: SortOrder
    carrier?: SortOrder
    shipmentCost?: SortOrder
    estimatedDelivery?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    promoCodeId?: SortOrder
    promoCodeUsed?: SortOrder
    promoDiscount?: SortOrder
    addressId?: SortOrder
    refundReason?: SortOrder
    refundedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    orderEmail?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    id?: SortOrder
    shippingCost?: SortOrder
    subtotal?: SortOrder
    discountAmount?: SortOrder
    taxAmount?: SortOrder
    amountTotal?: SortOrder
    deliveryDays?: SortOrder
    shipmentCost?: SortOrder
    promoCodeId?: SortOrder
    promoDiscount?: SortOrder
    addressId?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    shippingMethod?: SortOrder
    shippingCost?: SortOrder
    stripeSessionId?: SortOrder
    stripeCustomerId?: SortOrder
    paymentIntentId?: SortOrder
    subtotal?: SortOrder
    discountAmount?: SortOrder
    taxAmount?: SortOrder
    amountTotal?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    trackingCode?: SortOrder
    trackingNumber?: SortOrder
    trackingUrl?: SortOrder
    labelUrl?: SortOrder
    deliveryDate?: SortOrder
    deliveryDays?: SortOrder
    methodShipped?: SortOrder
    carrier?: SortOrder
    shipmentCost?: SortOrder
    estimatedDelivery?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    promoCodeId?: SortOrder
    promoCodeUsed?: SortOrder
    promoDiscount?: SortOrder
    addressId?: SortOrder
    refundReason?: SortOrder
    refundedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    orderEmail?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    shippingMethod?: SortOrder
    shippingCost?: SortOrder
    stripeSessionId?: SortOrder
    stripeCustomerId?: SortOrder
    paymentIntentId?: SortOrder
    subtotal?: SortOrder
    discountAmount?: SortOrder
    taxAmount?: SortOrder
    amountTotal?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    trackingCode?: SortOrder
    trackingNumber?: SortOrder
    trackingUrl?: SortOrder
    labelUrl?: SortOrder
    deliveryDate?: SortOrder
    deliveryDays?: SortOrder
    methodShipped?: SortOrder
    carrier?: SortOrder
    shipmentCost?: SortOrder
    estimatedDelivery?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    promoCodeId?: SortOrder
    promoCodeUsed?: SortOrder
    promoDiscount?: SortOrder
    addressId?: SortOrder
    refundReason?: SortOrder
    refundedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    orderEmail?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    id?: SortOrder
    shippingCost?: SortOrder
    subtotal?: SortOrder
    discountAmount?: SortOrder
    taxAmount?: SortOrder
    amountTotal?: SortOrder
    deliveryDays?: SortOrder
    shipmentCost?: SortOrder
    promoCodeId?: SortOrder
    promoDiscount?: SortOrder
    addressId?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderItemOrderByRelevanceInput = {
    fields: OrderItemOrderByRelevanceFieldEnum | OrderItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    variantId?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    images?: SortOrder
    variantSize?: SortOrder
    variantColor?: SortOrder
    variantSku?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    totalPrice?: SortOrder
    taxAmount?: SortOrder
    taxRate?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    totalPrice?: SortOrder
    taxAmount?: SortOrder
    taxRate?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    variantId?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    variantSize?: SortOrder
    variantColor?: SortOrder
    variantSku?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    totalPrice?: SortOrder
    taxAmount?: SortOrder
    taxRate?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    variantId?: SortOrder
    productId?: SortOrder
    productTitle?: SortOrder
    variantSize?: SortOrder
    variantColor?: SortOrder
    variantSku?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    totalPrice?: SortOrder
    taxAmount?: SortOrder
    taxRate?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    totalPrice?: SortOrder
    taxAmount?: SortOrder
    taxRate?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type VariantOrderByRelevanceInput = {
    fields: VariantOrderByRelevanceFieldEnum | VariantOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type VariantProductIdSizeColorCompoundUniqueInput = {
    productId: string
    size: string
    color: string
  }

  export type VariantCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    size?: SortOrder
    color?: SortOrder
    stockQuantity?: SortOrder
    sku?: SortOrder
    sanityRevisionId?: SortOrder
    lastSyncedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VariantAvgOrderByAggregateInput = {
    stockQuantity?: SortOrder
  }

  export type VariantMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    size?: SortOrder
    color?: SortOrder
    stockQuantity?: SortOrder
    sku?: SortOrder
    sanityRevisionId?: SortOrder
    lastSyncedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VariantMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    size?: SortOrder
    color?: SortOrder
    stockQuantity?: SortOrder
    sku?: SortOrder
    sanityRevisionId?: SortOrder
    lastSyncedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VariantSumOrderByAggregateInput = {
    stockQuantity?: SortOrder
  }

  export type VariantListRelationFilter = {
    every?: VariantWhereInput
    some?: VariantWhereInput
    none?: VariantWhereInput
  }

  export type VariantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelevanceInput = {
    fields: ProductOrderByRelevanceFieldEnum | ProductOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    price?: SortOrder
    images?: SortOrder
    categories?: SortOrder
    sanityRevisionId?: SortOrder
    lastSyncedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    price?: SortOrder
    sanityRevisionId?: SortOrder
    lastSyncedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    price?: SortOrder
    sanityRevisionId?: SortOrder
    lastSyncedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type CartListRelationFilter = {
    every?: CartWhereInput
    some?: CartWhereInput
    none?: CartWhereInput
  }

  export type CartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AddressOrderByRelevanceInput = {
    fields: AddressOrderByRelevanceFieldEnum | AddressOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AddressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    company?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    phone?: SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AddressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    company?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    phone?: SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    company?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    phone?: SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CheckoutSessionOrderByRelevanceInput = {
    fields: CheckoutSessionOrderByRelevanceFieldEnum | CheckoutSessionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CheckoutSessionCountOrderByAggregateInput = {
    id?: SortOrder
    stripeSessionId?: SortOrder
    cartId?: SortOrder
    subtotal?: SortOrder
    estimatedTax?: SortOrder
    estimatedShipping?: SortOrder
    promoDiscount?: SortOrder
    estimatedTotal?: SortOrder
    finalTax?: SortOrder
    finalShipping?: SortOrder
    finalTotal?: SortOrder
    status?: SortOrder
    stripeEventId?: SortOrder
    webhookProcessedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CheckoutSessionAvgOrderByAggregateInput = {
    id?: SortOrder
    cartId?: SortOrder
    subtotal?: SortOrder
    estimatedTax?: SortOrder
    estimatedShipping?: SortOrder
    promoDiscount?: SortOrder
    estimatedTotal?: SortOrder
    finalTax?: SortOrder
    finalShipping?: SortOrder
    finalTotal?: SortOrder
  }

  export type CheckoutSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    stripeSessionId?: SortOrder
    cartId?: SortOrder
    subtotal?: SortOrder
    estimatedTax?: SortOrder
    estimatedShipping?: SortOrder
    promoDiscount?: SortOrder
    estimatedTotal?: SortOrder
    finalTax?: SortOrder
    finalShipping?: SortOrder
    finalTotal?: SortOrder
    status?: SortOrder
    stripeEventId?: SortOrder
    webhookProcessedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CheckoutSessionMinOrderByAggregateInput = {
    id?: SortOrder
    stripeSessionId?: SortOrder
    cartId?: SortOrder
    subtotal?: SortOrder
    estimatedTax?: SortOrder
    estimatedShipping?: SortOrder
    promoDiscount?: SortOrder
    estimatedTotal?: SortOrder
    finalTax?: SortOrder
    finalShipping?: SortOrder
    finalTotal?: SortOrder
    status?: SortOrder
    stripeEventId?: SortOrder
    webhookProcessedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CheckoutSessionSumOrderByAggregateInput = {
    id?: SortOrder
    cartId?: SortOrder
    subtotal?: SortOrder
    estimatedTax?: SortOrder
    estimatedShipping?: SortOrder
    promoDiscount?: SortOrder
    estimatedTotal?: SortOrder
    finalTax?: SortOrder
    finalShipping?: SortOrder
    finalTotal?: SortOrder
  }

  export type SanitySyncOrderByRelevanceInput = {
    fields: SanitySyncOrderByRelevanceFieldEnum | SanitySyncOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SanitySyncCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentType?: SortOrder
    operation?: SortOrder
    revisionId?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    payload?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SanitySyncAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SanitySyncMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentType?: SortOrder
    operation?: SortOrder
    revisionId?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SanitySyncMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    documentType?: SortOrder
    operation?: SortOrder
    revisionId?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SanitySyncSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PromoCodeOrderByRelevanceInput = {
    fields: PromoCodeOrderByRelevanceFieldEnum | PromoCodeOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PromoCodeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    discountCents?: SortOrder
    discountPercentage?: SortOrder
    minOrderAmount?: SortOrder
    maxDiscountAmount?: SortOrder
    maxUses?: SortOrder
    maxUsesPerUser?: SortOrder
    validFrom?: SortOrder
    validTo?: SortOrder
    isPublic?: SortOrder
    isActive?: SortOrder
    isFirstTimeOnly?: SortOrder
    allowedCategories?: SortOrder
    excludedCategories?: SortOrder
    allowedProducts?: SortOrder
    excludedProducts?: SortOrder
    usageCount?: SortOrder
    createdBy?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromoCodeAvgOrderByAggregateInput = {
    id?: SortOrder
    discountCents?: SortOrder
    discountPercentage?: SortOrder
    minOrderAmount?: SortOrder
    maxDiscountAmount?: SortOrder
    maxUses?: SortOrder
    maxUsesPerUser?: SortOrder
    usageCount?: SortOrder
  }

  export type PromoCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    discountCents?: SortOrder
    discountPercentage?: SortOrder
    minOrderAmount?: SortOrder
    maxDiscountAmount?: SortOrder
    maxUses?: SortOrder
    maxUsesPerUser?: SortOrder
    validFrom?: SortOrder
    validTo?: SortOrder
    isPublic?: SortOrder
    isActive?: SortOrder
    isFirstTimeOnly?: SortOrder
    usageCount?: SortOrder
    createdBy?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromoCodeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    discountCents?: SortOrder
    discountPercentage?: SortOrder
    minOrderAmount?: SortOrder
    maxDiscountAmount?: SortOrder
    maxUses?: SortOrder
    maxUsesPerUser?: SortOrder
    validFrom?: SortOrder
    validTo?: SortOrder
    isPublic?: SortOrder
    isActive?: SortOrder
    isFirstTimeOnly?: SortOrder
    usageCount?: SortOrder
    createdBy?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromoCodeSumOrderByAggregateInput = {
    id?: SortOrder
    discountCents?: SortOrder
    discountPercentage?: SortOrder
    minOrderAmount?: SortOrder
    maxDiscountAmount?: SortOrder
    maxUses?: SortOrder
    maxUsesPerUser?: SortOrder
    usageCount?: SortOrder
  }

  export type PromoCodeScalarRelationFilter = {
    is?: PromoCodeWhereInput
    isNot?: PromoCodeWhereInput
  }

  export type OrderNullableScalarRelationFilter = {
    is?: OrderWhereInput | null
    isNot?: OrderWhereInput | null
  }

  export type PromoCodeUsageOrderByRelevanceInput = {
    fields: PromoCodeUsageOrderByRelevanceFieldEnum | PromoCodeUsageOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PromoCodeUsagePromoCodeIdOrderIdCompoundUniqueInput = {
    promoCodeId: number
    orderId: number
  }

  export type PromoCodeUsageCountOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    userId?: SortOrder
    orderId?: SortOrder
    discountApplied?: SortOrder
    orderAmount?: SortOrder
    status?: SortOrder
    failureReason?: SortOrder
    usedAt?: SortOrder
  }

  export type PromoCodeUsageAvgOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    orderId?: SortOrder
    discountApplied?: SortOrder
    orderAmount?: SortOrder
  }

  export type PromoCodeUsageMaxOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    userId?: SortOrder
    orderId?: SortOrder
    discountApplied?: SortOrder
    orderAmount?: SortOrder
    status?: SortOrder
    failureReason?: SortOrder
    usedAt?: SortOrder
  }

  export type PromoCodeUsageMinOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    userId?: SortOrder
    orderId?: SortOrder
    discountApplied?: SortOrder
    orderAmount?: SortOrder
    status?: SortOrder
    failureReason?: SortOrder
    usedAt?: SortOrder
  }

  export type PromoCodeUsageSumOrderByAggregateInput = {
    id?: SortOrder
    promoCodeId?: SortOrder
    orderId?: SortOrder
    discountApplied?: SortOrder
    orderAmount?: SortOrder
  }

  export type CartCreateNestedOneWithoutUserInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    connectOrCreate?: CartCreateOrConnectWithoutUserInput
    connect?: CartWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type AddressCreateNestedManyWithoutUserInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type PromoCodeUsageCreateNestedManyWithoutUserInput = {
    create?: XOR<PromoCodeUsageCreateWithoutUserInput, PromoCodeUsageUncheckedCreateWithoutUserInput> | PromoCodeUsageCreateWithoutUserInput[] | PromoCodeUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PromoCodeUsageCreateOrConnectWithoutUserInput | PromoCodeUsageCreateOrConnectWithoutUserInput[]
    createMany?: PromoCodeUsageCreateManyUserInputEnvelope
    connect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
  }

  export type CartUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    connectOrCreate?: CartCreateOrConnectWithoutUserInput
    connect?: CartWhereUniqueInput
  }

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type PromoCodeUsageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PromoCodeUsageCreateWithoutUserInput, PromoCodeUsageUncheckedCreateWithoutUserInput> | PromoCodeUsageCreateWithoutUserInput[] | PromoCodeUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PromoCodeUsageCreateOrConnectWithoutUserInput | PromoCodeUsageCreateOrConnectWithoutUserInput[]
    createMany?: PromoCodeUsageCreateManyUserInputEnvelope
    connect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CartUpdateOneWithoutUserNestedInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    connectOrCreate?: CartCreateOrConnectWithoutUserInput
    upsert?: CartUpsertWithoutUserInput
    disconnect?: CartWhereInput | boolean
    delete?: CartWhereInput | boolean
    connect?: CartWhereUniqueInput
    update?: XOR<XOR<CartUpdateToOneWithWhereWithoutUserInput, CartUpdateWithoutUserInput>, CartUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type AddressUpdateManyWithoutUserNestedInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutUserInput | AddressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutUserInput | AddressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutUserInput | AddressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type PromoCodeUsageUpdateManyWithoutUserNestedInput = {
    create?: XOR<PromoCodeUsageCreateWithoutUserInput, PromoCodeUsageUncheckedCreateWithoutUserInput> | PromoCodeUsageCreateWithoutUserInput[] | PromoCodeUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PromoCodeUsageCreateOrConnectWithoutUserInput | PromoCodeUsageCreateOrConnectWithoutUserInput[]
    upsert?: PromoCodeUsageUpsertWithWhereUniqueWithoutUserInput | PromoCodeUsageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PromoCodeUsageCreateManyUserInputEnvelope
    set?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    disconnect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    delete?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    connect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    update?: PromoCodeUsageUpdateWithWhereUniqueWithoutUserInput | PromoCodeUsageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PromoCodeUsageUpdateManyWithWhereWithoutUserInput | PromoCodeUsageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PromoCodeUsageScalarWhereInput | PromoCodeUsageScalarWhereInput[]
  }

  export type CartUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    connectOrCreate?: CartCreateOrConnectWithoutUserInput
    upsert?: CartUpsertWithoutUserInput
    disconnect?: CartWhereInput | boolean
    delete?: CartWhereInput | boolean
    connect?: CartWhereUniqueInput
    update?: XOR<XOR<CartUpdateToOneWithWhereWithoutUserInput, CartUpdateWithoutUserInput>, CartUncheckedUpdateWithoutUserInput>
  }

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutUserInput | AddressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutUserInput | AddressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutUserInput | AddressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type PromoCodeUsageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PromoCodeUsageCreateWithoutUserInput, PromoCodeUsageUncheckedCreateWithoutUserInput> | PromoCodeUsageCreateWithoutUserInput[] | PromoCodeUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PromoCodeUsageCreateOrConnectWithoutUserInput | PromoCodeUsageCreateOrConnectWithoutUserInput[]
    upsert?: PromoCodeUsageUpsertWithWhereUniqueWithoutUserInput | PromoCodeUsageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PromoCodeUsageCreateManyUserInputEnvelope
    set?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    disconnect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    delete?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    connect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    update?: PromoCodeUsageUpdateWithWhereUniqueWithoutUserInput | PromoCodeUsageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PromoCodeUsageUpdateManyWithWhereWithoutUserInput | PromoCodeUsageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PromoCodeUsageScalarWhereInput | PromoCodeUsageScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCartInput = {
    create?: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
    connectOrCreate?: UserCreateOrConnectWithoutCartInput
    connect?: UserWhereUniqueInput
  }

  export type PromoCodeCreateNestedOneWithoutCartsInput = {
    create?: XOR<PromoCodeCreateWithoutCartsInput, PromoCodeUncheckedCreateWithoutCartsInput>
    connectOrCreate?: PromoCodeCreateOrConnectWithoutCartsInput
    connect?: PromoCodeWhereUniqueInput
  }

  export type AddressCreateNestedOneWithoutCartsInput = {
    create?: XOR<AddressCreateWithoutCartsInput, AddressUncheckedCreateWithoutCartsInput>
    connectOrCreate?: AddressCreateOrConnectWithoutCartsInput
    connect?: AddressWhereUniqueInput
  }

  export type CartItemCreateNestedManyWithoutCartInput = {
    create?: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput> | CartItemCreateWithoutCartInput[] | CartItemUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutCartInput | CartItemCreateOrConnectWithoutCartInput[]
    createMany?: CartItemCreateManyCartInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type CheckoutSessionCreateNestedManyWithoutCartInput = {
    create?: XOR<CheckoutSessionCreateWithoutCartInput, CheckoutSessionUncheckedCreateWithoutCartInput> | CheckoutSessionCreateWithoutCartInput[] | CheckoutSessionUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CheckoutSessionCreateOrConnectWithoutCartInput | CheckoutSessionCreateOrConnectWithoutCartInput[]
    createMany?: CheckoutSessionCreateManyCartInputEnvelope
    connect?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
  }

  export type CartItemUncheckedCreateNestedManyWithoutCartInput = {
    create?: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput> | CartItemCreateWithoutCartInput[] | CartItemUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutCartInput | CartItemCreateOrConnectWithoutCartInput[]
    createMany?: CartItemCreateManyCartInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type CheckoutSessionUncheckedCreateNestedManyWithoutCartInput = {
    create?: XOR<CheckoutSessionCreateWithoutCartInput, CheckoutSessionUncheckedCreateWithoutCartInput> | CheckoutSessionCreateWithoutCartInput[] | CheckoutSessionUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CheckoutSessionCreateOrConnectWithoutCartInput | CheckoutSessionCreateOrConnectWithoutCartInput[]
    createMany?: CheckoutSessionCreateManyCartInputEnvelope
    connect?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneWithoutCartNestedInput = {
    create?: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
    connectOrCreate?: UserCreateOrConnectWithoutCartInput
    upsert?: UserUpsertWithoutCartInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCartInput, UserUpdateWithoutCartInput>, UserUncheckedUpdateWithoutCartInput>
  }

  export type PromoCodeUpdateOneWithoutCartsNestedInput = {
    create?: XOR<PromoCodeCreateWithoutCartsInput, PromoCodeUncheckedCreateWithoutCartsInput>
    connectOrCreate?: PromoCodeCreateOrConnectWithoutCartsInput
    upsert?: PromoCodeUpsertWithoutCartsInput
    disconnect?: PromoCodeWhereInput | boolean
    delete?: PromoCodeWhereInput | boolean
    connect?: PromoCodeWhereUniqueInput
    update?: XOR<XOR<PromoCodeUpdateToOneWithWhereWithoutCartsInput, PromoCodeUpdateWithoutCartsInput>, PromoCodeUncheckedUpdateWithoutCartsInput>
  }

  export type AddressUpdateOneWithoutCartsNestedInput = {
    create?: XOR<AddressCreateWithoutCartsInput, AddressUncheckedCreateWithoutCartsInput>
    connectOrCreate?: AddressCreateOrConnectWithoutCartsInput
    upsert?: AddressUpsertWithoutCartsInput
    disconnect?: AddressWhereInput | boolean
    delete?: AddressWhereInput | boolean
    connect?: AddressWhereUniqueInput
    update?: XOR<XOR<AddressUpdateToOneWithWhereWithoutCartsInput, AddressUpdateWithoutCartsInput>, AddressUncheckedUpdateWithoutCartsInput>
  }

  export type CartItemUpdateManyWithoutCartNestedInput = {
    create?: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput> | CartItemCreateWithoutCartInput[] | CartItemUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutCartInput | CartItemCreateOrConnectWithoutCartInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutCartInput | CartItemUpsertWithWhereUniqueWithoutCartInput[]
    createMany?: CartItemCreateManyCartInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutCartInput | CartItemUpdateWithWhereUniqueWithoutCartInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutCartInput | CartItemUpdateManyWithWhereWithoutCartInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type CheckoutSessionUpdateManyWithoutCartNestedInput = {
    create?: XOR<CheckoutSessionCreateWithoutCartInput, CheckoutSessionUncheckedCreateWithoutCartInput> | CheckoutSessionCreateWithoutCartInput[] | CheckoutSessionUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CheckoutSessionCreateOrConnectWithoutCartInput | CheckoutSessionCreateOrConnectWithoutCartInput[]
    upsert?: CheckoutSessionUpsertWithWhereUniqueWithoutCartInput | CheckoutSessionUpsertWithWhereUniqueWithoutCartInput[]
    createMany?: CheckoutSessionCreateManyCartInputEnvelope
    set?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    disconnect?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    delete?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    connect?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    update?: CheckoutSessionUpdateWithWhereUniqueWithoutCartInput | CheckoutSessionUpdateWithWhereUniqueWithoutCartInput[]
    updateMany?: CheckoutSessionUpdateManyWithWhereWithoutCartInput | CheckoutSessionUpdateManyWithWhereWithoutCartInput[]
    deleteMany?: CheckoutSessionScalarWhereInput | CheckoutSessionScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CartItemUncheckedUpdateManyWithoutCartNestedInput = {
    create?: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput> | CartItemCreateWithoutCartInput[] | CartItemUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutCartInput | CartItemCreateOrConnectWithoutCartInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutCartInput | CartItemUpsertWithWhereUniqueWithoutCartInput[]
    createMany?: CartItemCreateManyCartInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutCartInput | CartItemUpdateWithWhereUniqueWithoutCartInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutCartInput | CartItemUpdateManyWithWhereWithoutCartInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type CheckoutSessionUncheckedUpdateManyWithoutCartNestedInput = {
    create?: XOR<CheckoutSessionCreateWithoutCartInput, CheckoutSessionUncheckedCreateWithoutCartInput> | CheckoutSessionCreateWithoutCartInput[] | CheckoutSessionUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CheckoutSessionCreateOrConnectWithoutCartInput | CheckoutSessionCreateOrConnectWithoutCartInput[]
    upsert?: CheckoutSessionUpsertWithWhereUniqueWithoutCartInput | CheckoutSessionUpsertWithWhereUniqueWithoutCartInput[]
    createMany?: CheckoutSessionCreateManyCartInputEnvelope
    set?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    disconnect?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    delete?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    connect?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    update?: CheckoutSessionUpdateWithWhereUniqueWithoutCartInput | CheckoutSessionUpdateWithWhereUniqueWithoutCartInput[]
    updateMany?: CheckoutSessionUpdateManyWithWhereWithoutCartInput | CheckoutSessionUpdateManyWithWhereWithoutCartInput[]
    deleteMany?: CheckoutSessionScalarWhereInput | CheckoutSessionScalarWhereInput[]
  }

  export type CartCreateNestedOneWithoutItemsInput = {
    create?: XOR<CartCreateWithoutItemsInput, CartUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CartCreateOrConnectWithoutItemsInput
    connect?: CartWhereUniqueInput
  }

  export type VariantCreateNestedOneWithoutCartItemsInput = {
    create?: XOR<VariantCreateWithoutCartItemsInput, VariantUncheckedCreateWithoutCartItemsInput>
    connectOrCreate?: VariantCreateOrConnectWithoutCartItemsInput
    connect?: VariantWhereUniqueInput
  }

  export type CartUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<CartCreateWithoutItemsInput, CartUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CartCreateOrConnectWithoutItemsInput
    upsert?: CartUpsertWithoutItemsInput
    connect?: CartWhereUniqueInput
    update?: XOR<XOR<CartUpdateToOneWithWhereWithoutItemsInput, CartUpdateWithoutItemsInput>, CartUncheckedUpdateWithoutItemsInput>
  }

  export type VariantUpdateOneRequiredWithoutCartItemsNestedInput = {
    create?: XOR<VariantCreateWithoutCartItemsInput, VariantUncheckedCreateWithoutCartItemsInput>
    connectOrCreate?: VariantCreateOrConnectWithoutCartItemsInput
    upsert?: VariantUpsertWithoutCartItemsInput
    connect?: VariantWhereUniqueInput
    update?: XOR<XOR<VariantUpdateToOneWithWhereWithoutCartItemsInput, VariantUpdateWithoutCartItemsInput>, VariantUncheckedUpdateWithoutCartItemsInput>
  }

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type PromoCodeCreateNestedOneWithoutOrdersInput = {
    create?: XOR<PromoCodeCreateWithoutOrdersInput, PromoCodeUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: PromoCodeCreateOrConnectWithoutOrdersInput
    connect?: PromoCodeWhereUniqueInput
  }

  export type AddressCreateNestedOneWithoutOrdersInput = {
    create?: XOR<AddressCreateWithoutOrdersInput, AddressUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: AddressCreateOrConnectWithoutOrdersInput
    connect?: AddressWhereUniqueInput
  }

  export type PromoCodeUsageCreateNestedManyWithoutOrderInput = {
    create?: XOR<PromoCodeUsageCreateWithoutOrderInput, PromoCodeUsageUncheckedCreateWithoutOrderInput> | PromoCodeUsageCreateWithoutOrderInput[] | PromoCodeUsageUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PromoCodeUsageCreateOrConnectWithoutOrderInput | PromoCodeUsageCreateOrConnectWithoutOrderInput[]
    createMany?: PromoCodeUsageCreateManyOrderInputEnvelope
    connect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type PromoCodeUsageUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<PromoCodeUsageCreateWithoutOrderInput, PromoCodeUsageUncheckedCreateWithoutOrderInput> | PromoCodeUsageCreateWithoutOrderInput[] | PromoCodeUsageUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PromoCodeUsageCreateOrConnectWithoutOrderInput | PromoCodeUsageCreateOrConnectWithoutOrderInput[]
    createMany?: PromoCodeUsageCreateManyOrderInputEnvelope
    connect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    upsert?: UserUpsertWithoutOrdersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersInput, UserUpdateWithoutOrdersInput>, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type PromoCodeUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<PromoCodeCreateWithoutOrdersInput, PromoCodeUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: PromoCodeCreateOrConnectWithoutOrdersInput
    upsert?: PromoCodeUpsertWithoutOrdersInput
    disconnect?: PromoCodeWhereInput | boolean
    delete?: PromoCodeWhereInput | boolean
    connect?: PromoCodeWhereUniqueInput
    update?: XOR<XOR<PromoCodeUpdateToOneWithWhereWithoutOrdersInput, PromoCodeUpdateWithoutOrdersInput>, PromoCodeUncheckedUpdateWithoutOrdersInput>
  }

  export type AddressUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<AddressCreateWithoutOrdersInput, AddressUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: AddressCreateOrConnectWithoutOrdersInput
    upsert?: AddressUpsertWithoutOrdersInput
    disconnect?: AddressWhereInput | boolean
    delete?: AddressWhereInput | boolean
    connect?: AddressWhereUniqueInput
    update?: XOR<XOR<AddressUpdateToOneWithWhereWithoutOrdersInput, AddressUpdateWithoutOrdersInput>, AddressUncheckedUpdateWithoutOrdersInput>
  }

  export type PromoCodeUsageUpdateManyWithoutOrderNestedInput = {
    create?: XOR<PromoCodeUsageCreateWithoutOrderInput, PromoCodeUsageUncheckedCreateWithoutOrderInput> | PromoCodeUsageCreateWithoutOrderInput[] | PromoCodeUsageUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PromoCodeUsageCreateOrConnectWithoutOrderInput | PromoCodeUsageCreateOrConnectWithoutOrderInput[]
    upsert?: PromoCodeUsageUpsertWithWhereUniqueWithoutOrderInput | PromoCodeUsageUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: PromoCodeUsageCreateManyOrderInputEnvelope
    set?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    disconnect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    delete?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    connect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    update?: PromoCodeUsageUpdateWithWhereUniqueWithoutOrderInput | PromoCodeUsageUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: PromoCodeUsageUpdateManyWithWhereWithoutOrderInput | PromoCodeUsageUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: PromoCodeUsageScalarWhereInput | PromoCodeUsageScalarWhereInput[]
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type PromoCodeUsageUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<PromoCodeUsageCreateWithoutOrderInput, PromoCodeUsageUncheckedCreateWithoutOrderInput> | PromoCodeUsageCreateWithoutOrderInput[] | PromoCodeUsageUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PromoCodeUsageCreateOrConnectWithoutOrderInput | PromoCodeUsageCreateOrConnectWithoutOrderInput[]
    upsert?: PromoCodeUsageUpsertWithWhereUniqueWithoutOrderInput | PromoCodeUsageUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: PromoCodeUsageCreateManyOrderInputEnvelope
    set?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    disconnect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    delete?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    connect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    update?: PromoCodeUsageUpdateWithWhereUniqueWithoutOrderInput | PromoCodeUsageUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: PromoCodeUsageUpdateManyWithWhereWithoutOrderInput | PromoCodeUsageUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: PromoCodeUsageScalarWhereInput | PromoCodeUsageScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type VariantCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<VariantCreateWithoutOrderItemsInput, VariantUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: VariantCreateOrConnectWithoutOrderItemsInput
    connect?: VariantWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type VariantUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<VariantCreateWithoutOrderItemsInput, VariantUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: VariantCreateOrConnectWithoutOrderItemsInput
    upsert?: VariantUpsertWithoutOrderItemsInput
    connect?: VariantWhereUniqueInput
    update?: XOR<XOR<VariantUpdateToOneWithWhereWithoutOrderItemsInput, VariantUpdateWithoutOrderItemsInput>, VariantUncheckedUpdateWithoutOrderItemsInput>
  }

  export type ProductCreateNestedOneWithoutVariantsInput = {
    create?: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput
    connect?: ProductWhereUniqueInput
  }

  export type CartItemCreateNestedManyWithoutVariantInput = {
    create?: XOR<CartItemCreateWithoutVariantInput, CartItemUncheckedCreateWithoutVariantInput> | CartItemCreateWithoutVariantInput[] | CartItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutVariantInput | CartItemCreateOrConnectWithoutVariantInput[]
    createMany?: CartItemCreateManyVariantInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type OrderItemCreateNestedManyWithoutVariantInput = {
    create?: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput> | OrderItemCreateWithoutVariantInput[] | OrderItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutVariantInput | OrderItemCreateOrConnectWithoutVariantInput[]
    createMany?: OrderItemCreateManyVariantInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type CartItemUncheckedCreateNestedManyWithoutVariantInput = {
    create?: XOR<CartItemCreateWithoutVariantInput, CartItemUncheckedCreateWithoutVariantInput> | CartItemCreateWithoutVariantInput[] | CartItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutVariantInput | CartItemCreateOrConnectWithoutVariantInput[]
    createMany?: CartItemCreateManyVariantInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutVariantInput = {
    create?: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput> | OrderItemCreateWithoutVariantInput[] | OrderItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutVariantInput | OrderItemCreateOrConnectWithoutVariantInput[]
    createMany?: OrderItemCreateManyVariantInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type ProductUpdateOneRequiredWithoutVariantsNestedInput = {
    create?: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput
    upsert?: ProductUpsertWithoutVariantsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutVariantsInput, ProductUpdateWithoutVariantsInput>, ProductUncheckedUpdateWithoutVariantsInput>
  }

  export type CartItemUpdateManyWithoutVariantNestedInput = {
    create?: XOR<CartItemCreateWithoutVariantInput, CartItemUncheckedCreateWithoutVariantInput> | CartItemCreateWithoutVariantInput[] | CartItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutVariantInput | CartItemCreateOrConnectWithoutVariantInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutVariantInput | CartItemUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: CartItemCreateManyVariantInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutVariantInput | CartItemUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutVariantInput | CartItemUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type OrderItemUpdateManyWithoutVariantNestedInput = {
    create?: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput> | OrderItemCreateWithoutVariantInput[] | OrderItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutVariantInput | OrderItemCreateOrConnectWithoutVariantInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutVariantInput | OrderItemUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: OrderItemCreateManyVariantInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutVariantInput | OrderItemUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutVariantInput | OrderItemUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type CartItemUncheckedUpdateManyWithoutVariantNestedInput = {
    create?: XOR<CartItemCreateWithoutVariantInput, CartItemUncheckedCreateWithoutVariantInput> | CartItemCreateWithoutVariantInput[] | CartItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutVariantInput | CartItemCreateOrConnectWithoutVariantInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutVariantInput | CartItemUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: CartItemCreateManyVariantInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutVariantInput | CartItemUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutVariantInput | CartItemUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutVariantNestedInput = {
    create?: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput> | OrderItemCreateWithoutVariantInput[] | OrderItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutVariantInput | OrderItemCreateOrConnectWithoutVariantInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutVariantInput | OrderItemUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: OrderItemCreateManyVariantInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutVariantInput | OrderItemUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutVariantInput | OrderItemUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type VariantCreateNestedManyWithoutProductInput = {
    create?: XOR<VariantCreateWithoutProductInput, VariantUncheckedCreateWithoutProductInput> | VariantCreateWithoutProductInput[] | VariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: VariantCreateOrConnectWithoutProductInput | VariantCreateOrConnectWithoutProductInput[]
    createMany?: VariantCreateManyProductInputEnvelope
    connect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
  }

  export type VariantUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<VariantCreateWithoutProductInput, VariantUncheckedCreateWithoutProductInput> | VariantCreateWithoutProductInput[] | VariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: VariantCreateOrConnectWithoutProductInput | VariantCreateOrConnectWithoutProductInput[]
    createMany?: VariantCreateManyProductInputEnvelope
    connect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
  }

  export type VariantUpdateManyWithoutProductNestedInput = {
    create?: XOR<VariantCreateWithoutProductInput, VariantUncheckedCreateWithoutProductInput> | VariantCreateWithoutProductInput[] | VariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: VariantCreateOrConnectWithoutProductInput | VariantCreateOrConnectWithoutProductInput[]
    upsert?: VariantUpsertWithWhereUniqueWithoutProductInput | VariantUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: VariantCreateManyProductInputEnvelope
    set?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    disconnect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    delete?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    connect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    update?: VariantUpdateWithWhereUniqueWithoutProductInput | VariantUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: VariantUpdateManyWithWhereWithoutProductInput | VariantUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: VariantScalarWhereInput | VariantScalarWhereInput[]
  }

  export type VariantUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<VariantCreateWithoutProductInput, VariantUncheckedCreateWithoutProductInput> | VariantCreateWithoutProductInput[] | VariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: VariantCreateOrConnectWithoutProductInput | VariantCreateOrConnectWithoutProductInput[]
    upsert?: VariantUpsertWithWhereUniqueWithoutProductInput | VariantUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: VariantCreateManyProductInputEnvelope
    set?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    disconnect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    delete?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    connect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    update?: VariantUpdateWithWhereUniqueWithoutProductInput | VariantUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: VariantUpdateManyWithWhereWithoutProductInput | VariantUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: VariantScalarWhereInput | VariantScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAddressesInput = {
    create?: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddressesInput
    connect?: UserWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutAddressInput = {
    create?: XOR<OrderCreateWithoutAddressInput, OrderUncheckedCreateWithoutAddressInput> | OrderCreateWithoutAddressInput[] | OrderUncheckedCreateWithoutAddressInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAddressInput | OrderCreateOrConnectWithoutAddressInput[]
    createMany?: OrderCreateManyAddressInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type CartCreateNestedManyWithoutShippingAddressInput = {
    create?: XOR<CartCreateWithoutShippingAddressInput, CartUncheckedCreateWithoutShippingAddressInput> | CartCreateWithoutShippingAddressInput[] | CartUncheckedCreateWithoutShippingAddressInput[]
    connectOrCreate?: CartCreateOrConnectWithoutShippingAddressInput | CartCreateOrConnectWithoutShippingAddressInput[]
    createMany?: CartCreateManyShippingAddressInputEnvelope
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutAddressInput = {
    create?: XOR<OrderCreateWithoutAddressInput, OrderUncheckedCreateWithoutAddressInput> | OrderCreateWithoutAddressInput[] | OrderUncheckedCreateWithoutAddressInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAddressInput | OrderCreateOrConnectWithoutAddressInput[]
    createMany?: OrderCreateManyAddressInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type CartUncheckedCreateNestedManyWithoutShippingAddressInput = {
    create?: XOR<CartCreateWithoutShippingAddressInput, CartUncheckedCreateWithoutShippingAddressInput> | CartCreateWithoutShippingAddressInput[] | CartUncheckedCreateWithoutShippingAddressInput[]
    connectOrCreate?: CartCreateOrConnectWithoutShippingAddressInput | CartCreateOrConnectWithoutShippingAddressInput[]
    createMany?: CartCreateManyShippingAddressInputEnvelope
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutAddressesNestedInput = {
    create?: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddressesInput
    upsert?: UserUpsertWithoutAddressesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAddressesInput, UserUpdateWithoutAddressesInput>, UserUncheckedUpdateWithoutAddressesInput>
  }

  export type OrderUpdateManyWithoutAddressNestedInput = {
    create?: XOR<OrderCreateWithoutAddressInput, OrderUncheckedCreateWithoutAddressInput> | OrderCreateWithoutAddressInput[] | OrderUncheckedCreateWithoutAddressInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAddressInput | OrderCreateOrConnectWithoutAddressInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutAddressInput | OrderUpsertWithWhereUniqueWithoutAddressInput[]
    createMany?: OrderCreateManyAddressInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutAddressInput | OrderUpdateWithWhereUniqueWithoutAddressInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutAddressInput | OrderUpdateManyWithWhereWithoutAddressInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type CartUpdateManyWithoutShippingAddressNestedInput = {
    create?: XOR<CartCreateWithoutShippingAddressInput, CartUncheckedCreateWithoutShippingAddressInput> | CartCreateWithoutShippingAddressInput[] | CartUncheckedCreateWithoutShippingAddressInput[]
    connectOrCreate?: CartCreateOrConnectWithoutShippingAddressInput | CartCreateOrConnectWithoutShippingAddressInput[]
    upsert?: CartUpsertWithWhereUniqueWithoutShippingAddressInput | CartUpsertWithWhereUniqueWithoutShippingAddressInput[]
    createMany?: CartCreateManyShippingAddressInputEnvelope
    set?: CartWhereUniqueInput | CartWhereUniqueInput[]
    disconnect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    delete?: CartWhereUniqueInput | CartWhereUniqueInput[]
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    update?: CartUpdateWithWhereUniqueWithoutShippingAddressInput | CartUpdateWithWhereUniqueWithoutShippingAddressInput[]
    updateMany?: CartUpdateManyWithWhereWithoutShippingAddressInput | CartUpdateManyWithWhereWithoutShippingAddressInput[]
    deleteMany?: CartScalarWhereInput | CartScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutAddressNestedInput = {
    create?: XOR<OrderCreateWithoutAddressInput, OrderUncheckedCreateWithoutAddressInput> | OrderCreateWithoutAddressInput[] | OrderUncheckedCreateWithoutAddressInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutAddressInput | OrderCreateOrConnectWithoutAddressInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutAddressInput | OrderUpsertWithWhereUniqueWithoutAddressInput[]
    createMany?: OrderCreateManyAddressInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutAddressInput | OrderUpdateWithWhereUniqueWithoutAddressInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutAddressInput | OrderUpdateManyWithWhereWithoutAddressInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type CartUncheckedUpdateManyWithoutShippingAddressNestedInput = {
    create?: XOR<CartCreateWithoutShippingAddressInput, CartUncheckedCreateWithoutShippingAddressInput> | CartCreateWithoutShippingAddressInput[] | CartUncheckedCreateWithoutShippingAddressInput[]
    connectOrCreate?: CartCreateOrConnectWithoutShippingAddressInput | CartCreateOrConnectWithoutShippingAddressInput[]
    upsert?: CartUpsertWithWhereUniqueWithoutShippingAddressInput | CartUpsertWithWhereUniqueWithoutShippingAddressInput[]
    createMany?: CartCreateManyShippingAddressInputEnvelope
    set?: CartWhereUniqueInput | CartWhereUniqueInput[]
    disconnect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    delete?: CartWhereUniqueInput | CartWhereUniqueInput[]
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    update?: CartUpdateWithWhereUniqueWithoutShippingAddressInput | CartUpdateWithWhereUniqueWithoutShippingAddressInput[]
    updateMany?: CartUpdateManyWithWhereWithoutShippingAddressInput | CartUpdateManyWithWhereWithoutShippingAddressInput[]
    deleteMany?: CartScalarWhereInput | CartScalarWhereInput[]
  }

  export type CartCreateNestedOneWithoutCheckoutSessionsInput = {
    create?: XOR<CartCreateWithoutCheckoutSessionsInput, CartUncheckedCreateWithoutCheckoutSessionsInput>
    connectOrCreate?: CartCreateOrConnectWithoutCheckoutSessionsInput
    connect?: CartWhereUniqueInput
  }

  export type CartUpdateOneWithoutCheckoutSessionsNestedInput = {
    create?: XOR<CartCreateWithoutCheckoutSessionsInput, CartUncheckedCreateWithoutCheckoutSessionsInput>
    connectOrCreate?: CartCreateOrConnectWithoutCheckoutSessionsInput
    upsert?: CartUpsertWithoutCheckoutSessionsInput
    disconnect?: CartWhereInput | boolean
    delete?: CartWhereInput | boolean
    connect?: CartWhereUniqueInput
    update?: XOR<XOR<CartUpdateToOneWithWhereWithoutCheckoutSessionsInput, CartUpdateWithoutCheckoutSessionsInput>, CartUncheckedUpdateWithoutCheckoutSessionsInput>
  }

  export type CartCreateNestedManyWithoutAppliedPromoCodeInput = {
    create?: XOR<CartCreateWithoutAppliedPromoCodeInput, CartUncheckedCreateWithoutAppliedPromoCodeInput> | CartCreateWithoutAppliedPromoCodeInput[] | CartUncheckedCreateWithoutAppliedPromoCodeInput[]
    connectOrCreate?: CartCreateOrConnectWithoutAppliedPromoCodeInput | CartCreateOrConnectWithoutAppliedPromoCodeInput[]
    createMany?: CartCreateManyAppliedPromoCodeInputEnvelope
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutPromoCodeInput = {
    create?: XOR<OrderCreateWithoutPromoCodeInput, OrderUncheckedCreateWithoutPromoCodeInput> | OrderCreateWithoutPromoCodeInput[] | OrderUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPromoCodeInput | OrderCreateOrConnectWithoutPromoCodeInput[]
    createMany?: OrderCreateManyPromoCodeInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type PromoCodeUsageCreateNestedManyWithoutPromoCodeInput = {
    create?: XOR<PromoCodeUsageCreateWithoutPromoCodeInput, PromoCodeUsageUncheckedCreateWithoutPromoCodeInput> | PromoCodeUsageCreateWithoutPromoCodeInput[] | PromoCodeUsageUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: PromoCodeUsageCreateOrConnectWithoutPromoCodeInput | PromoCodeUsageCreateOrConnectWithoutPromoCodeInput[]
    createMany?: PromoCodeUsageCreateManyPromoCodeInputEnvelope
    connect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
  }

  export type CartUncheckedCreateNestedManyWithoutAppliedPromoCodeInput = {
    create?: XOR<CartCreateWithoutAppliedPromoCodeInput, CartUncheckedCreateWithoutAppliedPromoCodeInput> | CartCreateWithoutAppliedPromoCodeInput[] | CartUncheckedCreateWithoutAppliedPromoCodeInput[]
    connectOrCreate?: CartCreateOrConnectWithoutAppliedPromoCodeInput | CartCreateOrConnectWithoutAppliedPromoCodeInput[]
    createMany?: CartCreateManyAppliedPromoCodeInputEnvelope
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutPromoCodeInput = {
    create?: XOR<OrderCreateWithoutPromoCodeInput, OrderUncheckedCreateWithoutPromoCodeInput> | OrderCreateWithoutPromoCodeInput[] | OrderUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPromoCodeInput | OrderCreateOrConnectWithoutPromoCodeInput[]
    createMany?: OrderCreateManyPromoCodeInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type PromoCodeUsageUncheckedCreateNestedManyWithoutPromoCodeInput = {
    create?: XOR<PromoCodeUsageCreateWithoutPromoCodeInput, PromoCodeUsageUncheckedCreateWithoutPromoCodeInput> | PromoCodeUsageCreateWithoutPromoCodeInput[] | PromoCodeUsageUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: PromoCodeUsageCreateOrConnectWithoutPromoCodeInput | PromoCodeUsageCreateOrConnectWithoutPromoCodeInput[]
    createMany?: PromoCodeUsageCreateManyPromoCodeInputEnvelope
    connect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
  }

  export type CartUpdateManyWithoutAppliedPromoCodeNestedInput = {
    create?: XOR<CartCreateWithoutAppliedPromoCodeInput, CartUncheckedCreateWithoutAppliedPromoCodeInput> | CartCreateWithoutAppliedPromoCodeInput[] | CartUncheckedCreateWithoutAppliedPromoCodeInput[]
    connectOrCreate?: CartCreateOrConnectWithoutAppliedPromoCodeInput | CartCreateOrConnectWithoutAppliedPromoCodeInput[]
    upsert?: CartUpsertWithWhereUniqueWithoutAppliedPromoCodeInput | CartUpsertWithWhereUniqueWithoutAppliedPromoCodeInput[]
    createMany?: CartCreateManyAppliedPromoCodeInputEnvelope
    set?: CartWhereUniqueInput | CartWhereUniqueInput[]
    disconnect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    delete?: CartWhereUniqueInput | CartWhereUniqueInput[]
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    update?: CartUpdateWithWhereUniqueWithoutAppliedPromoCodeInput | CartUpdateWithWhereUniqueWithoutAppliedPromoCodeInput[]
    updateMany?: CartUpdateManyWithWhereWithoutAppliedPromoCodeInput | CartUpdateManyWithWhereWithoutAppliedPromoCodeInput[]
    deleteMany?: CartScalarWhereInput | CartScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutPromoCodeNestedInput = {
    create?: XOR<OrderCreateWithoutPromoCodeInput, OrderUncheckedCreateWithoutPromoCodeInput> | OrderCreateWithoutPromoCodeInput[] | OrderUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPromoCodeInput | OrderCreateOrConnectWithoutPromoCodeInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutPromoCodeInput | OrderUpsertWithWhereUniqueWithoutPromoCodeInput[]
    createMany?: OrderCreateManyPromoCodeInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutPromoCodeInput | OrderUpdateWithWhereUniqueWithoutPromoCodeInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutPromoCodeInput | OrderUpdateManyWithWhereWithoutPromoCodeInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type PromoCodeUsageUpdateManyWithoutPromoCodeNestedInput = {
    create?: XOR<PromoCodeUsageCreateWithoutPromoCodeInput, PromoCodeUsageUncheckedCreateWithoutPromoCodeInput> | PromoCodeUsageCreateWithoutPromoCodeInput[] | PromoCodeUsageUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: PromoCodeUsageCreateOrConnectWithoutPromoCodeInput | PromoCodeUsageCreateOrConnectWithoutPromoCodeInput[]
    upsert?: PromoCodeUsageUpsertWithWhereUniqueWithoutPromoCodeInput | PromoCodeUsageUpsertWithWhereUniqueWithoutPromoCodeInput[]
    createMany?: PromoCodeUsageCreateManyPromoCodeInputEnvelope
    set?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    disconnect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    delete?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    connect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    update?: PromoCodeUsageUpdateWithWhereUniqueWithoutPromoCodeInput | PromoCodeUsageUpdateWithWhereUniqueWithoutPromoCodeInput[]
    updateMany?: PromoCodeUsageUpdateManyWithWhereWithoutPromoCodeInput | PromoCodeUsageUpdateManyWithWhereWithoutPromoCodeInput[]
    deleteMany?: PromoCodeUsageScalarWhereInput | PromoCodeUsageScalarWhereInput[]
  }

  export type CartUncheckedUpdateManyWithoutAppliedPromoCodeNestedInput = {
    create?: XOR<CartCreateWithoutAppliedPromoCodeInput, CartUncheckedCreateWithoutAppliedPromoCodeInput> | CartCreateWithoutAppliedPromoCodeInput[] | CartUncheckedCreateWithoutAppliedPromoCodeInput[]
    connectOrCreate?: CartCreateOrConnectWithoutAppliedPromoCodeInput | CartCreateOrConnectWithoutAppliedPromoCodeInput[]
    upsert?: CartUpsertWithWhereUniqueWithoutAppliedPromoCodeInput | CartUpsertWithWhereUniqueWithoutAppliedPromoCodeInput[]
    createMany?: CartCreateManyAppliedPromoCodeInputEnvelope
    set?: CartWhereUniqueInput | CartWhereUniqueInput[]
    disconnect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    delete?: CartWhereUniqueInput | CartWhereUniqueInput[]
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    update?: CartUpdateWithWhereUniqueWithoutAppliedPromoCodeInput | CartUpdateWithWhereUniqueWithoutAppliedPromoCodeInput[]
    updateMany?: CartUpdateManyWithWhereWithoutAppliedPromoCodeInput | CartUpdateManyWithWhereWithoutAppliedPromoCodeInput[]
    deleteMany?: CartScalarWhereInput | CartScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutPromoCodeNestedInput = {
    create?: XOR<OrderCreateWithoutPromoCodeInput, OrderUncheckedCreateWithoutPromoCodeInput> | OrderCreateWithoutPromoCodeInput[] | OrderUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPromoCodeInput | OrderCreateOrConnectWithoutPromoCodeInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutPromoCodeInput | OrderUpsertWithWhereUniqueWithoutPromoCodeInput[]
    createMany?: OrderCreateManyPromoCodeInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutPromoCodeInput | OrderUpdateWithWhereUniqueWithoutPromoCodeInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutPromoCodeInput | OrderUpdateManyWithWhereWithoutPromoCodeInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type PromoCodeUsageUncheckedUpdateManyWithoutPromoCodeNestedInput = {
    create?: XOR<PromoCodeUsageCreateWithoutPromoCodeInput, PromoCodeUsageUncheckedCreateWithoutPromoCodeInput> | PromoCodeUsageCreateWithoutPromoCodeInput[] | PromoCodeUsageUncheckedCreateWithoutPromoCodeInput[]
    connectOrCreate?: PromoCodeUsageCreateOrConnectWithoutPromoCodeInput | PromoCodeUsageCreateOrConnectWithoutPromoCodeInput[]
    upsert?: PromoCodeUsageUpsertWithWhereUniqueWithoutPromoCodeInput | PromoCodeUsageUpsertWithWhereUniqueWithoutPromoCodeInput[]
    createMany?: PromoCodeUsageCreateManyPromoCodeInputEnvelope
    set?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    disconnect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    delete?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    connect?: PromoCodeUsageWhereUniqueInput | PromoCodeUsageWhereUniqueInput[]
    update?: PromoCodeUsageUpdateWithWhereUniqueWithoutPromoCodeInput | PromoCodeUsageUpdateWithWhereUniqueWithoutPromoCodeInput[]
    updateMany?: PromoCodeUsageUpdateManyWithWhereWithoutPromoCodeInput | PromoCodeUsageUpdateManyWithWhereWithoutPromoCodeInput[]
    deleteMany?: PromoCodeUsageScalarWhereInput | PromoCodeUsageScalarWhereInput[]
  }

  export type PromoCodeCreateNestedOneWithoutUserUsagesInput = {
    create?: XOR<PromoCodeCreateWithoutUserUsagesInput, PromoCodeUncheckedCreateWithoutUserUsagesInput>
    connectOrCreate?: PromoCodeCreateOrConnectWithoutUserUsagesInput
    connect?: PromoCodeWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPromoUsagesInput = {
    create?: XOR<UserCreateWithoutPromoUsagesInput, UserUncheckedCreateWithoutPromoUsagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPromoUsagesInput
    connect?: UserWhereUniqueInput
  }

  export type OrderCreateNestedOneWithoutPromoUsagesInput = {
    create?: XOR<OrderCreateWithoutPromoUsagesInput, OrderUncheckedCreateWithoutPromoUsagesInput>
    connectOrCreate?: OrderCreateOrConnectWithoutPromoUsagesInput
    connect?: OrderWhereUniqueInput
  }

  export type PromoCodeUpdateOneRequiredWithoutUserUsagesNestedInput = {
    create?: XOR<PromoCodeCreateWithoutUserUsagesInput, PromoCodeUncheckedCreateWithoutUserUsagesInput>
    connectOrCreate?: PromoCodeCreateOrConnectWithoutUserUsagesInput
    upsert?: PromoCodeUpsertWithoutUserUsagesInput
    connect?: PromoCodeWhereUniqueInput
    update?: XOR<XOR<PromoCodeUpdateToOneWithWhereWithoutUserUsagesInput, PromoCodeUpdateWithoutUserUsagesInput>, PromoCodeUncheckedUpdateWithoutUserUsagesInput>
  }

  export type UserUpdateOneRequiredWithoutPromoUsagesNestedInput = {
    create?: XOR<UserCreateWithoutPromoUsagesInput, UserUncheckedCreateWithoutPromoUsagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPromoUsagesInput
    upsert?: UserUpsertWithoutPromoUsagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPromoUsagesInput, UserUpdateWithoutPromoUsagesInput>, UserUncheckedUpdateWithoutPromoUsagesInput>
  }

  export type OrderUpdateOneWithoutPromoUsagesNestedInput = {
    create?: XOR<OrderCreateWithoutPromoUsagesInput, OrderUncheckedCreateWithoutPromoUsagesInput>
    connectOrCreate?: OrderCreateOrConnectWithoutPromoUsagesInput
    upsert?: OrderUpsertWithoutPromoUsagesInput
    disconnect?: OrderWhereInput | boolean
    delete?: OrderWhereInput | boolean
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutPromoUsagesInput, OrderUpdateWithoutPromoUsagesInput>, OrderUncheckedUpdateWithoutPromoUsagesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type CartCreateWithoutUserInput = {
    tempCartId?: string | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appliedPromoCode?: PromoCodeCreateNestedOneWithoutCartsInput
    shippingAddress?: AddressCreateNestedOneWithoutCartsInput
    items?: CartItemCreateNestedManyWithoutCartInput
    checkoutSessions?: CheckoutSessionCreateNestedManyWithoutCartInput
  }

  export type CartUncheckedCreateWithoutUserInput = {
    id?: number
    tempCartId?: string | null
    appliedPromoCodeId?: number | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    shippingAddressId?: number | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: CartItemUncheckedCreateNestedManyWithoutCartInput
    checkoutSessions?: CheckoutSessionUncheckedCreateNestedManyWithoutCartInput
  }

  export type CartCreateOrConnectWithoutUserInput = {
    where: CartWhereUniqueInput
    create: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateWithoutUserInput = {
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
    promoCode?: PromoCodeCreateNestedOneWithoutOrdersInput
    address?: AddressCreateNestedOneWithoutOrdersInput
    promoUsages?: PromoCodeUsageCreateNestedManyWithoutOrderInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutUserInput = {
    id?: number
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeId?: number | null
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    addressId?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
    promoUsages?: PromoCodeUsageUncheckedCreateNestedManyWithoutOrderInput
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AddressCreateWithoutUserInput = {
    firstName: string
    lastName: string
    company?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    phone?: string | null
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutAddressInput
    carts?: CartCreateNestedManyWithoutShippingAddressInput
  }

  export type AddressUncheckedCreateWithoutUserInput = {
    id?: number
    firstName: string
    lastName: string
    company?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    phone?: string | null
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutAddressInput
    carts?: CartUncheckedCreateNestedManyWithoutShippingAddressInput
  }

  export type AddressCreateOrConnectWithoutUserInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput>
  }

  export type AddressCreateManyUserInputEnvelope = {
    data: AddressCreateManyUserInput | AddressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PromoCodeUsageCreateWithoutUserInput = {
    discountApplied: number
    orderAmount: number
    status: string
    failureReason?: string | null
    usedAt?: Date | string
    promoCode: PromoCodeCreateNestedOneWithoutUserUsagesInput
    order?: OrderCreateNestedOneWithoutPromoUsagesInput
  }

  export type PromoCodeUsageUncheckedCreateWithoutUserInput = {
    id?: number
    promoCodeId: number
    orderId?: number | null
    discountApplied: number
    orderAmount: number
    status: string
    failureReason?: string | null
    usedAt?: Date | string
  }

  export type PromoCodeUsageCreateOrConnectWithoutUserInput = {
    where: PromoCodeUsageWhereUniqueInput
    create: XOR<PromoCodeUsageCreateWithoutUserInput, PromoCodeUsageUncheckedCreateWithoutUserInput>
  }

  export type PromoCodeUsageCreateManyUserInputEnvelope = {
    data: PromoCodeUsageCreateManyUserInput | PromoCodeUsageCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CartUpsertWithoutUserInput = {
    update: XOR<CartUpdateWithoutUserInput, CartUncheckedUpdateWithoutUserInput>
    create: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    where?: CartWhereInput
  }

  export type CartUpdateToOneWithWhereWithoutUserInput = {
    where?: CartWhereInput
    data: XOR<CartUpdateWithoutUserInput, CartUncheckedUpdateWithoutUserInput>
  }

  export type CartUpdateWithoutUserInput = {
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appliedPromoCode?: PromoCodeUpdateOneWithoutCartsNestedInput
    shippingAddress?: AddressUpdateOneWithoutCartsNestedInput
    items?: CartItemUpdateManyWithoutCartNestedInput
    checkoutSessions?: CheckoutSessionUpdateManyWithoutCartNestedInput
  }

  export type CartUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    appliedPromoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddressId?: NullableIntFieldUpdateOperationsInput | number | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CartItemUncheckedUpdateManyWithoutCartNestedInput
    checkoutSessions?: CheckoutSessionUncheckedUpdateManyWithoutCartNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: IntFilter<"Order"> | number
    userId?: StringFilter<"Order"> | string
    shippingAddress?: JsonFilter<"Order">
    shippingMethod?: StringFilter<"Order"> | string
    shippingCost?: IntFilter<"Order"> | number
    stripeSessionId?: StringFilter<"Order"> | string
    stripeCustomerId?: StringNullableFilter<"Order"> | string | null
    paymentIntentId?: StringFilter<"Order"> | string
    subtotal?: IntFilter<"Order"> | number
    discountAmount?: IntFilter<"Order"> | number
    taxAmount?: IntFilter<"Order"> | number
    amountTotal?: IntFilter<"Order"> | number
    currency?: StringFilter<"Order"> | string
    taxCalculation?: JsonNullableFilter<"Order">
    status?: StringFilter<"Order"> | string
    trackingCode?: StringNullableFilter<"Order"> | string | null
    trackingNumber?: StringNullableFilter<"Order"> | string | null
    trackingUrl?: StringNullableFilter<"Order"> | string | null
    labelUrl?: StringNullableFilter<"Order"> | string | null
    deliveryDate?: DateTimeNullableFilter<"Order"> | Date | string | null
    deliveryDays?: IntNullableFilter<"Order"> | number | null
    methodShipped?: StringNullableFilter<"Order"> | string | null
    carrier?: StringNullableFilter<"Order"> | string | null
    shipmentCost?: IntNullableFilter<"Order"> | number | null
    estimatedDelivery?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    promoCodeId?: IntNullableFilter<"Order"> | number | null
    promoCodeUsed?: StringNullableFilter<"Order"> | string | null
    promoDiscount?: IntNullableFilter<"Order"> | number | null
    addressId?: IntNullableFilter<"Order"> | number | null
    refundReason?: StringNullableFilter<"Order"> | string | null
    refundedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    firstName?: StringFilter<"Order"> | string
    lastName?: StringFilter<"Order"> | string
    orderEmail?: StringFilter<"Order"> | string
  }

  export type AddressUpsertWithWhereUniqueWithoutUserInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutUserInput, AddressUncheckedUpdateWithoutUserInput>
    create: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutUserInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutUserInput, AddressUncheckedUpdateWithoutUserInput>
  }

  export type AddressUpdateManyWithWhereWithoutUserInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutUserInput>
  }

  export type AddressScalarWhereInput = {
    AND?: AddressScalarWhereInput | AddressScalarWhereInput[]
    OR?: AddressScalarWhereInput[]
    NOT?: AddressScalarWhereInput | AddressScalarWhereInput[]
    id?: IntFilter<"Address"> | number
    userId?: StringFilter<"Address"> | string
    firstName?: StringFilter<"Address"> | string
    lastName?: StringFilter<"Address"> | string
    company?: StringNullableFilter<"Address"> | string | null
    line1?: StringFilter<"Address"> | string
    line2?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    country?: StringFilter<"Address"> | string
    postalCode?: StringFilter<"Address"> | string
    phone?: StringNullableFilter<"Address"> | string | null
    type?: StringFilter<"Address"> | string
    isDefault?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
  }

  export type PromoCodeUsageUpsertWithWhereUniqueWithoutUserInput = {
    where: PromoCodeUsageWhereUniqueInput
    update: XOR<PromoCodeUsageUpdateWithoutUserInput, PromoCodeUsageUncheckedUpdateWithoutUserInput>
    create: XOR<PromoCodeUsageCreateWithoutUserInput, PromoCodeUsageUncheckedCreateWithoutUserInput>
  }

  export type PromoCodeUsageUpdateWithWhereUniqueWithoutUserInput = {
    where: PromoCodeUsageWhereUniqueInput
    data: XOR<PromoCodeUsageUpdateWithoutUserInput, PromoCodeUsageUncheckedUpdateWithoutUserInput>
  }

  export type PromoCodeUsageUpdateManyWithWhereWithoutUserInput = {
    where: PromoCodeUsageScalarWhereInput
    data: XOR<PromoCodeUsageUpdateManyMutationInput, PromoCodeUsageUncheckedUpdateManyWithoutUserInput>
  }

  export type PromoCodeUsageScalarWhereInput = {
    AND?: PromoCodeUsageScalarWhereInput | PromoCodeUsageScalarWhereInput[]
    OR?: PromoCodeUsageScalarWhereInput[]
    NOT?: PromoCodeUsageScalarWhereInput | PromoCodeUsageScalarWhereInput[]
    id?: IntFilter<"PromoCodeUsage"> | number
    promoCodeId?: IntFilter<"PromoCodeUsage"> | number
    userId?: StringFilter<"PromoCodeUsage"> | string
    orderId?: IntNullableFilter<"PromoCodeUsage"> | number | null
    discountApplied?: IntFilter<"PromoCodeUsage"> | number
    orderAmount?: IntFilter<"PromoCodeUsage"> | number
    status?: StringFilter<"PromoCodeUsage"> | string
    failureReason?: StringNullableFilter<"PromoCodeUsage"> | string | null
    usedAt?: DateTimeFilter<"PromoCodeUsage"> | Date | string
  }

  export type UserCreateWithoutCartInput = {
    id: string
    email: string
    name?: string | null
    provider?: string | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    orders?: OrderCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    promoUsages?: PromoCodeUsageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCartInput = {
    id: string
    email: string
    name?: string | null
    provider?: string | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    promoUsages?: PromoCodeUsageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCartInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
  }

  export type PromoCodeCreateWithoutCartsInput = {
    code: string
    name?: string | null
    description?: string | null
    discountCents?: number | null
    discountPercentage?: number | null
    minOrderAmount?: number
    maxDiscountAmount?: number | null
    maxUses?: number | null
    maxUsesPerUser?: number
    validFrom?: Date | string
    validTo?: Date | string | null
    isPublic?: boolean
    isActive?: boolean
    isFirstTimeOnly?: boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: number
    createdBy?: string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutPromoCodeInput
    userUsages?: PromoCodeUsageCreateNestedManyWithoutPromoCodeInput
  }

  export type PromoCodeUncheckedCreateWithoutCartsInput = {
    id?: number
    code: string
    name?: string | null
    description?: string | null
    discountCents?: number | null
    discountPercentage?: number | null
    minOrderAmount?: number
    maxDiscountAmount?: number | null
    maxUses?: number | null
    maxUsesPerUser?: number
    validFrom?: Date | string
    validTo?: Date | string | null
    isPublic?: boolean
    isActive?: boolean
    isFirstTimeOnly?: boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: number
    createdBy?: string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutPromoCodeInput
    userUsages?: PromoCodeUsageUncheckedCreateNestedManyWithoutPromoCodeInput
  }

  export type PromoCodeCreateOrConnectWithoutCartsInput = {
    where: PromoCodeWhereUniqueInput
    create: XOR<PromoCodeCreateWithoutCartsInput, PromoCodeUncheckedCreateWithoutCartsInput>
  }

  export type AddressCreateWithoutCartsInput = {
    firstName: string
    lastName: string
    company?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    phone?: string | null
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAddressesInput
    orders?: OrderCreateNestedManyWithoutAddressInput
  }

  export type AddressUncheckedCreateWithoutCartsInput = {
    id?: number
    userId: string
    firstName: string
    lastName: string
    company?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    phone?: string | null
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutAddressInput
  }

  export type AddressCreateOrConnectWithoutCartsInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutCartsInput, AddressUncheckedCreateWithoutCartsInput>
  }

  export type CartItemCreateWithoutCartInput = {
    quantity: number
    addedAt?: Date | string
    updatedAt?: Date | string
    variant: VariantCreateNestedOneWithoutCartItemsInput
  }

  export type CartItemUncheckedCreateWithoutCartInput = {
    id?: number
    variantId: string
    quantity: number
    addedAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartItemCreateOrConnectWithoutCartInput = {
    where: CartItemWhereUniqueInput
    create: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput>
  }

  export type CartItemCreateManyCartInputEnvelope = {
    data: CartItemCreateManyCartInput | CartItemCreateManyCartInput[]
    skipDuplicates?: boolean
  }

  export type CheckoutSessionCreateWithoutCartInput = {
    stripeSessionId: string
    subtotal: number
    estimatedTax: number
    estimatedShipping: number
    promoDiscount: number
    estimatedTotal: number
    finalTax?: number | null
    finalShipping?: number | null
    finalTotal?: number | null
    status?: string
    stripeEventId?: string | null
    webhookProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CheckoutSessionUncheckedCreateWithoutCartInput = {
    id?: number
    stripeSessionId: string
    subtotal: number
    estimatedTax: number
    estimatedShipping: number
    promoDiscount: number
    estimatedTotal: number
    finalTax?: number | null
    finalShipping?: number | null
    finalTotal?: number | null
    status?: string
    stripeEventId?: string | null
    webhookProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CheckoutSessionCreateOrConnectWithoutCartInput = {
    where: CheckoutSessionWhereUniqueInput
    create: XOR<CheckoutSessionCreateWithoutCartInput, CheckoutSessionUncheckedCreateWithoutCartInput>
  }

  export type CheckoutSessionCreateManyCartInputEnvelope = {
    data: CheckoutSessionCreateManyCartInput | CheckoutSessionCreateManyCartInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCartInput = {
    update: XOR<UserUpdateWithoutCartInput, UserUncheckedUpdateWithoutCartInput>
    create: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCartInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCartInput, UserUncheckedUpdateWithoutCartInput>
  }

  export type UserUpdateWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    orders?: OrderUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    promoUsages?: PromoCodeUsageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    promoUsages?: PromoCodeUsageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PromoCodeUpsertWithoutCartsInput = {
    update: XOR<PromoCodeUpdateWithoutCartsInput, PromoCodeUncheckedUpdateWithoutCartsInput>
    create: XOR<PromoCodeCreateWithoutCartsInput, PromoCodeUncheckedCreateWithoutCartsInput>
    where?: PromoCodeWhereInput
  }

  export type PromoCodeUpdateToOneWithWhereWithoutCartsInput = {
    where?: PromoCodeWhereInput
    data: XOR<PromoCodeUpdateWithoutCartsInput, PromoCodeUncheckedUpdateWithoutCartsInput>
  }

  export type PromoCodeUpdateWithoutCartsInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discountCents?: NullableIntFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    minOrderAmount?: IntFieldUpdateOperationsInput | number
    maxDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    maxUsesPerUser?: IntFieldUpdateOperationsInput | number
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFirstTimeOnly?: BoolFieldUpdateOperationsInput | boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutPromoCodeNestedInput
    userUsages?: PromoCodeUsageUpdateManyWithoutPromoCodeNestedInput
  }

  export type PromoCodeUncheckedUpdateWithoutCartsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discountCents?: NullableIntFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    minOrderAmount?: IntFieldUpdateOperationsInput | number
    maxDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    maxUsesPerUser?: IntFieldUpdateOperationsInput | number
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFirstTimeOnly?: BoolFieldUpdateOperationsInput | boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutPromoCodeNestedInput
    userUsages?: PromoCodeUsageUncheckedUpdateManyWithoutPromoCodeNestedInput
  }

  export type AddressUpsertWithoutCartsInput = {
    update: XOR<AddressUpdateWithoutCartsInput, AddressUncheckedUpdateWithoutCartsInput>
    create: XOR<AddressCreateWithoutCartsInput, AddressUncheckedCreateWithoutCartsInput>
    where?: AddressWhereInput
  }

  export type AddressUpdateToOneWithWhereWithoutCartsInput = {
    where?: AddressWhereInput
    data: XOR<AddressUpdateWithoutCartsInput, AddressUncheckedUpdateWithoutCartsInput>
  }

  export type AddressUpdateWithoutCartsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAddressesNestedInput
    orders?: OrderUpdateManyWithoutAddressNestedInput
  }

  export type AddressUncheckedUpdateWithoutCartsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutAddressNestedInput
  }

  export type CartItemUpsertWithWhereUniqueWithoutCartInput = {
    where: CartItemWhereUniqueInput
    update: XOR<CartItemUpdateWithoutCartInput, CartItemUncheckedUpdateWithoutCartInput>
    create: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput>
  }

  export type CartItemUpdateWithWhereUniqueWithoutCartInput = {
    where: CartItemWhereUniqueInput
    data: XOR<CartItemUpdateWithoutCartInput, CartItemUncheckedUpdateWithoutCartInput>
  }

  export type CartItemUpdateManyWithWhereWithoutCartInput = {
    where: CartItemScalarWhereInput
    data: XOR<CartItemUpdateManyMutationInput, CartItemUncheckedUpdateManyWithoutCartInput>
  }

  export type CartItemScalarWhereInput = {
    AND?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
    OR?: CartItemScalarWhereInput[]
    NOT?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
    id?: IntFilter<"CartItem"> | number
    cartId?: IntFilter<"CartItem"> | number
    variantId?: StringFilter<"CartItem"> | string
    quantity?: IntFilter<"CartItem"> | number
    addedAt?: DateTimeFilter<"CartItem"> | Date | string
    updatedAt?: DateTimeFilter<"CartItem"> | Date | string
  }

  export type CheckoutSessionUpsertWithWhereUniqueWithoutCartInput = {
    where: CheckoutSessionWhereUniqueInput
    update: XOR<CheckoutSessionUpdateWithoutCartInput, CheckoutSessionUncheckedUpdateWithoutCartInput>
    create: XOR<CheckoutSessionCreateWithoutCartInput, CheckoutSessionUncheckedCreateWithoutCartInput>
  }

  export type CheckoutSessionUpdateWithWhereUniqueWithoutCartInput = {
    where: CheckoutSessionWhereUniqueInput
    data: XOR<CheckoutSessionUpdateWithoutCartInput, CheckoutSessionUncheckedUpdateWithoutCartInput>
  }

  export type CheckoutSessionUpdateManyWithWhereWithoutCartInput = {
    where: CheckoutSessionScalarWhereInput
    data: XOR<CheckoutSessionUpdateManyMutationInput, CheckoutSessionUncheckedUpdateManyWithoutCartInput>
  }

  export type CheckoutSessionScalarWhereInput = {
    AND?: CheckoutSessionScalarWhereInput | CheckoutSessionScalarWhereInput[]
    OR?: CheckoutSessionScalarWhereInput[]
    NOT?: CheckoutSessionScalarWhereInput | CheckoutSessionScalarWhereInput[]
    id?: IntFilter<"CheckoutSession"> | number
    stripeSessionId?: StringFilter<"CheckoutSession"> | string
    cartId?: IntNullableFilter<"CheckoutSession"> | number | null
    subtotal?: IntFilter<"CheckoutSession"> | number
    estimatedTax?: IntFilter<"CheckoutSession"> | number
    estimatedShipping?: IntFilter<"CheckoutSession"> | number
    promoDiscount?: IntFilter<"CheckoutSession"> | number
    estimatedTotal?: IntFilter<"CheckoutSession"> | number
    finalTax?: IntNullableFilter<"CheckoutSession"> | number | null
    finalShipping?: IntNullableFilter<"CheckoutSession"> | number | null
    finalTotal?: IntNullableFilter<"CheckoutSession"> | number | null
    status?: StringFilter<"CheckoutSession"> | string
    stripeEventId?: StringNullableFilter<"CheckoutSession"> | string | null
    webhookProcessedAt?: DateTimeNullableFilter<"CheckoutSession"> | Date | string | null
    createdAt?: DateTimeFilter<"CheckoutSession"> | Date | string
    updatedAt?: DateTimeFilter<"CheckoutSession"> | Date | string
  }

  export type CartCreateWithoutItemsInput = {
    tempCartId?: string | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutCartInput
    appliedPromoCode?: PromoCodeCreateNestedOneWithoutCartsInput
    shippingAddress?: AddressCreateNestedOneWithoutCartsInput
    checkoutSessions?: CheckoutSessionCreateNestedManyWithoutCartInput
  }

  export type CartUncheckedCreateWithoutItemsInput = {
    id?: number
    userId?: string | null
    tempCartId?: string | null
    appliedPromoCodeId?: number | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    shippingAddressId?: number | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    checkoutSessions?: CheckoutSessionUncheckedCreateNestedManyWithoutCartInput
  }

  export type CartCreateOrConnectWithoutItemsInput = {
    where: CartWhereUniqueInput
    create: XOR<CartCreateWithoutItemsInput, CartUncheckedCreateWithoutItemsInput>
  }

  export type VariantCreateWithoutCartItemsInput = {
    id: string
    size: string
    color: string
    stockQuantity: number
    sku?: string | null
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutVariantsInput
    orderItems?: OrderItemCreateNestedManyWithoutVariantInput
  }

  export type VariantUncheckedCreateWithoutCartItemsInput = {
    id: string
    productId: string
    size: string
    color: string
    stockQuantity: number
    sku?: string | null
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutVariantInput
  }

  export type VariantCreateOrConnectWithoutCartItemsInput = {
    where: VariantWhereUniqueInput
    create: XOR<VariantCreateWithoutCartItemsInput, VariantUncheckedCreateWithoutCartItemsInput>
  }

  export type CartUpsertWithoutItemsInput = {
    update: XOR<CartUpdateWithoutItemsInput, CartUncheckedUpdateWithoutItemsInput>
    create: XOR<CartCreateWithoutItemsInput, CartUncheckedCreateWithoutItemsInput>
    where?: CartWhereInput
  }

  export type CartUpdateToOneWithWhereWithoutItemsInput = {
    where?: CartWhereInput
    data: XOR<CartUpdateWithoutItemsInput, CartUncheckedUpdateWithoutItemsInput>
  }

  export type CartUpdateWithoutItemsInput = {
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCartNestedInput
    appliedPromoCode?: PromoCodeUpdateOneWithoutCartsNestedInput
    shippingAddress?: AddressUpdateOneWithoutCartsNestedInput
    checkoutSessions?: CheckoutSessionUpdateManyWithoutCartNestedInput
  }

  export type CartUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    appliedPromoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddressId?: NullableIntFieldUpdateOperationsInput | number | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkoutSessions?: CheckoutSessionUncheckedUpdateManyWithoutCartNestedInput
  }

  export type VariantUpsertWithoutCartItemsInput = {
    update: XOR<VariantUpdateWithoutCartItemsInput, VariantUncheckedUpdateWithoutCartItemsInput>
    create: XOR<VariantCreateWithoutCartItemsInput, VariantUncheckedCreateWithoutCartItemsInput>
    where?: VariantWhereInput
  }

  export type VariantUpdateToOneWithWhereWithoutCartItemsInput = {
    where?: VariantWhereInput
    data: XOR<VariantUpdateWithoutCartItemsInput, VariantUncheckedUpdateWithoutCartItemsInput>
  }

  export type VariantUpdateWithoutCartItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
    orderItems?: OrderItemUpdateManyWithoutVariantNestedInput
  }

  export type VariantUncheckedUpdateWithoutCartItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type UserCreateWithoutOrdersInput = {
    id: string
    email: string
    name?: string | null
    provider?: string | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    cart?: CartCreateNestedOneWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    promoUsages?: PromoCodeUsageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrdersInput = {
    id: string
    email: string
    name?: string | null
    provider?: string | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    cart?: CartUncheckedCreateNestedOneWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    promoUsages?: PromoCodeUsageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
  }

  export type PromoCodeCreateWithoutOrdersInput = {
    code: string
    name?: string | null
    description?: string | null
    discountCents?: number | null
    discountPercentage?: number | null
    minOrderAmount?: number
    maxDiscountAmount?: number | null
    maxUses?: number | null
    maxUsesPerUser?: number
    validFrom?: Date | string
    validTo?: Date | string | null
    isPublic?: boolean
    isActive?: boolean
    isFirstTimeOnly?: boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: number
    createdBy?: string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    carts?: CartCreateNestedManyWithoutAppliedPromoCodeInput
    userUsages?: PromoCodeUsageCreateNestedManyWithoutPromoCodeInput
  }

  export type PromoCodeUncheckedCreateWithoutOrdersInput = {
    id?: number
    code: string
    name?: string | null
    description?: string | null
    discountCents?: number | null
    discountPercentage?: number | null
    minOrderAmount?: number
    maxDiscountAmount?: number | null
    maxUses?: number | null
    maxUsesPerUser?: number
    validFrom?: Date | string
    validTo?: Date | string | null
    isPublic?: boolean
    isActive?: boolean
    isFirstTimeOnly?: boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: number
    createdBy?: string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    carts?: CartUncheckedCreateNestedManyWithoutAppliedPromoCodeInput
    userUsages?: PromoCodeUsageUncheckedCreateNestedManyWithoutPromoCodeInput
  }

  export type PromoCodeCreateOrConnectWithoutOrdersInput = {
    where: PromoCodeWhereUniqueInput
    create: XOR<PromoCodeCreateWithoutOrdersInput, PromoCodeUncheckedCreateWithoutOrdersInput>
  }

  export type AddressCreateWithoutOrdersInput = {
    firstName: string
    lastName: string
    company?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    phone?: string | null
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAddressesInput
    carts?: CartCreateNestedManyWithoutShippingAddressInput
  }

  export type AddressUncheckedCreateWithoutOrdersInput = {
    id?: number
    userId: string
    firstName: string
    lastName: string
    company?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    phone?: string | null
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    carts?: CartUncheckedCreateNestedManyWithoutShippingAddressInput
  }

  export type AddressCreateOrConnectWithoutOrdersInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutOrdersInput, AddressUncheckedCreateWithoutOrdersInput>
  }

  export type PromoCodeUsageCreateWithoutOrderInput = {
    discountApplied: number
    orderAmount: number
    status: string
    failureReason?: string | null
    usedAt?: Date | string
    promoCode: PromoCodeCreateNestedOneWithoutUserUsagesInput
    user: UserCreateNestedOneWithoutPromoUsagesInput
  }

  export type PromoCodeUsageUncheckedCreateWithoutOrderInput = {
    id?: number
    promoCodeId: number
    userId: string
    discountApplied: number
    orderAmount: number
    status: string
    failureReason?: string | null
    usedAt?: Date | string
  }

  export type PromoCodeUsageCreateOrConnectWithoutOrderInput = {
    where: PromoCodeUsageWhereUniqueInput
    create: XOR<PromoCodeUsageCreateWithoutOrderInput, PromoCodeUsageUncheckedCreateWithoutOrderInput>
  }

  export type PromoCodeUsageCreateManyOrderInputEnvelope = {
    data: PromoCodeUsageCreateManyOrderInput | PromoCodeUsageCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemCreateWithoutOrderInput = {
    productId: string
    productTitle: string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize: string
    variantColor: string
    variantSku?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    taxAmount?: number | null
    taxRate?: number | null
    variant: VariantCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: number
    variantId: string
    productId: string
    productTitle: string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize: string
    variantColor: string
    variantSku?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    taxAmount?: number | null
    taxRate?: number | null
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    cart?: CartUpdateOneWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    promoUsages?: PromoCodeUsageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    cart?: CartUncheckedUpdateOneWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    promoUsages?: PromoCodeUsageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PromoCodeUpsertWithoutOrdersInput = {
    update: XOR<PromoCodeUpdateWithoutOrdersInput, PromoCodeUncheckedUpdateWithoutOrdersInput>
    create: XOR<PromoCodeCreateWithoutOrdersInput, PromoCodeUncheckedCreateWithoutOrdersInput>
    where?: PromoCodeWhereInput
  }

  export type PromoCodeUpdateToOneWithWhereWithoutOrdersInput = {
    where?: PromoCodeWhereInput
    data: XOR<PromoCodeUpdateWithoutOrdersInput, PromoCodeUncheckedUpdateWithoutOrdersInput>
  }

  export type PromoCodeUpdateWithoutOrdersInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discountCents?: NullableIntFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    minOrderAmount?: IntFieldUpdateOperationsInput | number
    maxDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    maxUsesPerUser?: IntFieldUpdateOperationsInput | number
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFirstTimeOnly?: BoolFieldUpdateOperationsInput | boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    carts?: CartUpdateManyWithoutAppliedPromoCodeNestedInput
    userUsages?: PromoCodeUsageUpdateManyWithoutPromoCodeNestedInput
  }

  export type PromoCodeUncheckedUpdateWithoutOrdersInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discountCents?: NullableIntFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    minOrderAmount?: IntFieldUpdateOperationsInput | number
    maxDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    maxUsesPerUser?: IntFieldUpdateOperationsInput | number
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFirstTimeOnly?: BoolFieldUpdateOperationsInput | boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    carts?: CartUncheckedUpdateManyWithoutAppliedPromoCodeNestedInput
    userUsages?: PromoCodeUsageUncheckedUpdateManyWithoutPromoCodeNestedInput
  }

  export type AddressUpsertWithoutOrdersInput = {
    update: XOR<AddressUpdateWithoutOrdersInput, AddressUncheckedUpdateWithoutOrdersInput>
    create: XOR<AddressCreateWithoutOrdersInput, AddressUncheckedCreateWithoutOrdersInput>
    where?: AddressWhereInput
  }

  export type AddressUpdateToOneWithWhereWithoutOrdersInput = {
    where?: AddressWhereInput
    data: XOR<AddressUpdateWithoutOrdersInput, AddressUncheckedUpdateWithoutOrdersInput>
  }

  export type AddressUpdateWithoutOrdersInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAddressesNestedInput
    carts?: CartUpdateManyWithoutShippingAddressNestedInput
  }

  export type AddressUncheckedUpdateWithoutOrdersInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    carts?: CartUncheckedUpdateManyWithoutShippingAddressNestedInput
  }

  export type PromoCodeUsageUpsertWithWhereUniqueWithoutOrderInput = {
    where: PromoCodeUsageWhereUniqueInput
    update: XOR<PromoCodeUsageUpdateWithoutOrderInput, PromoCodeUsageUncheckedUpdateWithoutOrderInput>
    create: XOR<PromoCodeUsageCreateWithoutOrderInput, PromoCodeUsageUncheckedCreateWithoutOrderInput>
  }

  export type PromoCodeUsageUpdateWithWhereUniqueWithoutOrderInput = {
    where: PromoCodeUsageWhereUniqueInput
    data: XOR<PromoCodeUsageUpdateWithoutOrderInput, PromoCodeUsageUncheckedUpdateWithoutOrderInput>
  }

  export type PromoCodeUsageUpdateManyWithWhereWithoutOrderInput = {
    where: PromoCodeUsageScalarWhereInput
    data: XOR<PromoCodeUsageUpdateManyMutationInput, PromoCodeUsageUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: IntFilter<"OrderItem"> | number
    orderId?: IntFilter<"OrderItem"> | number
    variantId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    productTitle?: StringFilter<"OrderItem"> | string
    images?: JsonNullableFilter<"OrderItem">
    variantSize?: StringFilter<"OrderItem"> | string
    variantColor?: StringFilter<"OrderItem"> | string
    variantSku?: StringNullableFilter<"OrderItem"> | string | null
    unitPrice?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    totalPrice?: IntFilter<"OrderItem"> | number
    taxAmount?: IntNullableFilter<"OrderItem"> | number | null
    taxRate?: FloatNullableFilter<"OrderItem"> | number | null
  }

  export type OrderCreateWithoutItemsInput = {
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
    user: UserCreateNestedOneWithoutOrdersInput
    promoCode?: PromoCodeCreateNestedOneWithoutOrdersInput
    address?: AddressCreateNestedOneWithoutOrdersInput
    promoUsages?: PromoCodeUsageCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: number
    userId: string
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeId?: number | null
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    addressId?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
    promoUsages?: PromoCodeUsageUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type VariantCreateWithoutOrderItemsInput = {
    id: string
    size: string
    color: string
    stockQuantity: number
    sku?: string | null
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutVariantsInput
    cartItems?: CartItemCreateNestedManyWithoutVariantInput
  }

  export type VariantUncheckedCreateWithoutOrderItemsInput = {
    id: string
    productId: string
    size: string
    color: string
    stockQuantity: number
    sku?: string | null
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cartItems?: CartItemUncheckedCreateNestedManyWithoutVariantInput
  }

  export type VariantCreateOrConnectWithoutOrderItemsInput = {
    where: VariantWhereUniqueInput
    create: XOR<VariantCreateWithoutOrderItemsInput, VariantUncheckedCreateWithoutOrderItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    promoCode?: PromoCodeUpdateOneWithoutOrdersNestedInput
    address?: AddressUpdateOneWithoutOrdersNestedInput
    promoUsages?: PromoCodeUsageUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    addressId?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
    promoUsages?: PromoCodeUsageUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type VariantUpsertWithoutOrderItemsInput = {
    update: XOR<VariantUpdateWithoutOrderItemsInput, VariantUncheckedUpdateWithoutOrderItemsInput>
    create: XOR<VariantCreateWithoutOrderItemsInput, VariantUncheckedCreateWithoutOrderItemsInput>
    where?: VariantWhereInput
  }

  export type VariantUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: VariantWhereInput
    data: XOR<VariantUpdateWithoutOrderItemsInput, VariantUncheckedUpdateWithoutOrderItemsInput>
  }

  export type VariantUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
    cartItems?: CartItemUpdateManyWithoutVariantNestedInput
  }

  export type VariantUncheckedUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cartItems?: CartItemUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type ProductCreateWithoutVariantsInput = {
    id: string
    title: string
    description?: string | null
    slug: string
    price?: number | null
    images?: NullableJsonNullValueInput | InputJsonValue
    categories?: NullableJsonNullValueInput | InputJsonValue
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUncheckedCreateWithoutVariantsInput = {
    id: string
    title: string
    description?: string | null
    slug: string
    price?: number | null
    images?: NullableJsonNullValueInput | InputJsonValue
    categories?: NullableJsonNullValueInput | InputJsonValue
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateOrConnectWithoutVariantsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
  }

  export type CartItemCreateWithoutVariantInput = {
    quantity: number
    addedAt?: Date | string
    updatedAt?: Date | string
    cart: CartCreateNestedOneWithoutItemsInput
  }

  export type CartItemUncheckedCreateWithoutVariantInput = {
    id?: number
    cartId: number
    quantity: number
    addedAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartItemCreateOrConnectWithoutVariantInput = {
    where: CartItemWhereUniqueInput
    create: XOR<CartItemCreateWithoutVariantInput, CartItemUncheckedCreateWithoutVariantInput>
  }

  export type CartItemCreateManyVariantInputEnvelope = {
    data: CartItemCreateManyVariantInput | CartItemCreateManyVariantInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemCreateWithoutVariantInput = {
    productId: string
    productTitle: string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize: string
    variantColor: string
    variantSku?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    taxAmount?: number | null
    taxRate?: number | null
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateWithoutVariantInput = {
    id?: number
    orderId: number
    productId: string
    productTitle: string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize: string
    variantColor: string
    variantSku?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    taxAmount?: number | null
    taxRate?: number | null
  }

  export type OrderItemCreateOrConnectWithoutVariantInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput>
  }

  export type OrderItemCreateManyVariantInputEnvelope = {
    data: OrderItemCreateManyVariantInput | OrderItemCreateManyVariantInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithoutVariantsInput = {
    update: XOR<ProductUpdateWithoutVariantsInput, ProductUncheckedUpdateWithoutVariantsInput>
    create: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutVariantsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutVariantsInput, ProductUncheckedUpdateWithoutVariantsInput>
  }

  export type ProductUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    price?: NullableIntFieldUpdateOperationsInput | number | null
    images?: NullableJsonNullValueInput | InputJsonValue
    categories?: NullableJsonNullValueInput | InputJsonValue
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    price?: NullableIntFieldUpdateOperationsInput | number | null
    images?: NullableJsonNullValueInput | InputJsonValue
    categories?: NullableJsonNullValueInput | InputJsonValue
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemUpsertWithWhereUniqueWithoutVariantInput = {
    where: CartItemWhereUniqueInput
    update: XOR<CartItemUpdateWithoutVariantInput, CartItemUncheckedUpdateWithoutVariantInput>
    create: XOR<CartItemCreateWithoutVariantInput, CartItemUncheckedCreateWithoutVariantInput>
  }

  export type CartItemUpdateWithWhereUniqueWithoutVariantInput = {
    where: CartItemWhereUniqueInput
    data: XOR<CartItemUpdateWithoutVariantInput, CartItemUncheckedUpdateWithoutVariantInput>
  }

  export type CartItemUpdateManyWithWhereWithoutVariantInput = {
    where: CartItemScalarWhereInput
    data: XOR<CartItemUpdateManyMutationInput, CartItemUncheckedUpdateManyWithoutVariantInput>
  }

  export type OrderItemUpsertWithWhereUniqueWithoutVariantInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutVariantInput, OrderItemUncheckedUpdateWithoutVariantInput>
    create: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutVariantInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutVariantInput, OrderItemUncheckedUpdateWithoutVariantInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutVariantInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutVariantInput>
  }

  export type VariantCreateWithoutProductInput = {
    id: string
    size: string
    color: string
    stockQuantity: number
    sku?: string | null
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cartItems?: CartItemCreateNestedManyWithoutVariantInput
    orderItems?: OrderItemCreateNestedManyWithoutVariantInput
  }

  export type VariantUncheckedCreateWithoutProductInput = {
    id: string
    size: string
    color: string
    stockQuantity: number
    sku?: string | null
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cartItems?: CartItemUncheckedCreateNestedManyWithoutVariantInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutVariantInput
  }

  export type VariantCreateOrConnectWithoutProductInput = {
    where: VariantWhereUniqueInput
    create: XOR<VariantCreateWithoutProductInput, VariantUncheckedCreateWithoutProductInput>
  }

  export type VariantCreateManyProductInputEnvelope = {
    data: VariantCreateManyProductInput | VariantCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type VariantUpsertWithWhereUniqueWithoutProductInput = {
    where: VariantWhereUniqueInput
    update: XOR<VariantUpdateWithoutProductInput, VariantUncheckedUpdateWithoutProductInput>
    create: XOR<VariantCreateWithoutProductInput, VariantUncheckedCreateWithoutProductInput>
  }

  export type VariantUpdateWithWhereUniqueWithoutProductInput = {
    where: VariantWhereUniqueInput
    data: XOR<VariantUpdateWithoutProductInput, VariantUncheckedUpdateWithoutProductInput>
  }

  export type VariantUpdateManyWithWhereWithoutProductInput = {
    where: VariantScalarWhereInput
    data: XOR<VariantUpdateManyMutationInput, VariantUncheckedUpdateManyWithoutProductInput>
  }

  export type VariantScalarWhereInput = {
    AND?: VariantScalarWhereInput | VariantScalarWhereInput[]
    OR?: VariantScalarWhereInput[]
    NOT?: VariantScalarWhereInput | VariantScalarWhereInput[]
    id?: StringFilter<"Variant"> | string
    productId?: StringFilter<"Variant"> | string
    size?: StringFilter<"Variant"> | string
    color?: StringFilter<"Variant"> | string
    stockQuantity?: IntFilter<"Variant"> | number
    sku?: StringNullableFilter<"Variant"> | string | null
    sanityRevisionId?: StringNullableFilter<"Variant"> | string | null
    lastSyncedAt?: DateTimeFilter<"Variant"> | Date | string
    isActive?: BoolFilter<"Variant"> | boolean
    createdAt?: DateTimeFilter<"Variant"> | Date | string
    updatedAt?: DateTimeFilter<"Variant"> | Date | string
  }

  export type UserCreateWithoutAddressesInput = {
    id: string
    email: string
    name?: string | null
    provider?: string | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    cart?: CartCreateNestedOneWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    promoUsages?: PromoCodeUsageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAddressesInput = {
    id: string
    email: string
    name?: string | null
    provider?: string | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    cart?: CartUncheckedCreateNestedOneWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    promoUsages?: PromoCodeUsageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAddressesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
  }

  export type OrderCreateWithoutAddressInput = {
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
    user: UserCreateNestedOneWithoutOrdersInput
    promoCode?: PromoCodeCreateNestedOneWithoutOrdersInput
    promoUsages?: PromoCodeUsageCreateNestedManyWithoutOrderInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutAddressInput = {
    id?: number
    userId: string
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeId?: number | null
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
    promoUsages?: PromoCodeUsageUncheckedCreateNestedManyWithoutOrderInput
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutAddressInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutAddressInput, OrderUncheckedCreateWithoutAddressInput>
  }

  export type OrderCreateManyAddressInputEnvelope = {
    data: OrderCreateManyAddressInput | OrderCreateManyAddressInput[]
    skipDuplicates?: boolean
  }

  export type CartCreateWithoutShippingAddressInput = {
    tempCartId?: string | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutCartInput
    appliedPromoCode?: PromoCodeCreateNestedOneWithoutCartsInput
    items?: CartItemCreateNestedManyWithoutCartInput
    checkoutSessions?: CheckoutSessionCreateNestedManyWithoutCartInput
  }

  export type CartUncheckedCreateWithoutShippingAddressInput = {
    id?: number
    userId?: string | null
    tempCartId?: string | null
    appliedPromoCodeId?: number | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: CartItemUncheckedCreateNestedManyWithoutCartInput
    checkoutSessions?: CheckoutSessionUncheckedCreateNestedManyWithoutCartInput
  }

  export type CartCreateOrConnectWithoutShippingAddressInput = {
    where: CartWhereUniqueInput
    create: XOR<CartCreateWithoutShippingAddressInput, CartUncheckedCreateWithoutShippingAddressInput>
  }

  export type CartCreateManyShippingAddressInputEnvelope = {
    data: CartCreateManyShippingAddressInput | CartCreateManyShippingAddressInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAddressesInput = {
    update: XOR<UserUpdateWithoutAddressesInput, UserUncheckedUpdateWithoutAddressesInput>
    create: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAddressesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAddressesInput, UserUncheckedUpdateWithoutAddressesInput>
  }

  export type UserUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    cart?: CartUpdateOneWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    promoUsages?: PromoCodeUsageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    cart?: CartUncheckedUpdateOneWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    promoUsages?: PromoCodeUsageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutAddressInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutAddressInput, OrderUncheckedUpdateWithoutAddressInput>
    create: XOR<OrderCreateWithoutAddressInput, OrderUncheckedCreateWithoutAddressInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutAddressInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutAddressInput, OrderUncheckedUpdateWithoutAddressInput>
  }

  export type OrderUpdateManyWithWhereWithoutAddressInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutAddressInput>
  }

  export type CartUpsertWithWhereUniqueWithoutShippingAddressInput = {
    where: CartWhereUniqueInput
    update: XOR<CartUpdateWithoutShippingAddressInput, CartUncheckedUpdateWithoutShippingAddressInput>
    create: XOR<CartCreateWithoutShippingAddressInput, CartUncheckedCreateWithoutShippingAddressInput>
  }

  export type CartUpdateWithWhereUniqueWithoutShippingAddressInput = {
    where: CartWhereUniqueInput
    data: XOR<CartUpdateWithoutShippingAddressInput, CartUncheckedUpdateWithoutShippingAddressInput>
  }

  export type CartUpdateManyWithWhereWithoutShippingAddressInput = {
    where: CartScalarWhereInput
    data: XOR<CartUpdateManyMutationInput, CartUncheckedUpdateManyWithoutShippingAddressInput>
  }

  export type CartScalarWhereInput = {
    AND?: CartScalarWhereInput | CartScalarWhereInput[]
    OR?: CartScalarWhereInput[]
    NOT?: CartScalarWhereInput | CartScalarWhereInput[]
    id?: IntFilter<"Cart"> | number
    userId?: StringNullableFilter<"Cart"> | string | null
    tempCartId?: StringNullableFilter<"Cart"> | string | null
    appliedPromoCodeId?: IntNullableFilter<"Cart"> | number | null
    promoDiscountAmount?: IntNullableFilter<"Cart"> | number | null
    promoAppliedAt?: DateTimeNullableFilter<"Cart"> | Date | string | null
    requiresPromoVerification?: BoolFilter<"Cart"> | boolean
    shippingMethod?: StringNullableFilter<"Cart"> | string | null
    shippingAddressId?: IntNullableFilter<"Cart"> | number | null
    stripeCheckoutSessionId?: StringNullableFilter<"Cart"> | string | null
    checkoutStatus?: StringNullableFilter<"Cart"> | string | null
    expiresAt?: DateTimeNullableFilter<"Cart"> | Date | string | null
    createdAt?: DateTimeFilter<"Cart"> | Date | string
    updatedAt?: DateTimeFilter<"Cart"> | Date | string
  }

  export type CartCreateWithoutCheckoutSessionsInput = {
    tempCartId?: string | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutCartInput
    appliedPromoCode?: PromoCodeCreateNestedOneWithoutCartsInput
    shippingAddress?: AddressCreateNestedOneWithoutCartsInput
    items?: CartItemCreateNestedManyWithoutCartInput
  }

  export type CartUncheckedCreateWithoutCheckoutSessionsInput = {
    id?: number
    userId?: string | null
    tempCartId?: string | null
    appliedPromoCodeId?: number | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    shippingAddressId?: number | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: CartItemUncheckedCreateNestedManyWithoutCartInput
  }

  export type CartCreateOrConnectWithoutCheckoutSessionsInput = {
    where: CartWhereUniqueInput
    create: XOR<CartCreateWithoutCheckoutSessionsInput, CartUncheckedCreateWithoutCheckoutSessionsInput>
  }

  export type CartUpsertWithoutCheckoutSessionsInput = {
    update: XOR<CartUpdateWithoutCheckoutSessionsInput, CartUncheckedUpdateWithoutCheckoutSessionsInput>
    create: XOR<CartCreateWithoutCheckoutSessionsInput, CartUncheckedCreateWithoutCheckoutSessionsInput>
    where?: CartWhereInput
  }

  export type CartUpdateToOneWithWhereWithoutCheckoutSessionsInput = {
    where?: CartWhereInput
    data: XOR<CartUpdateWithoutCheckoutSessionsInput, CartUncheckedUpdateWithoutCheckoutSessionsInput>
  }

  export type CartUpdateWithoutCheckoutSessionsInput = {
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCartNestedInput
    appliedPromoCode?: PromoCodeUpdateOneWithoutCartsNestedInput
    shippingAddress?: AddressUpdateOneWithoutCartsNestedInput
    items?: CartItemUpdateManyWithoutCartNestedInput
  }

  export type CartUncheckedUpdateWithoutCheckoutSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    appliedPromoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddressId?: NullableIntFieldUpdateOperationsInput | number | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CartItemUncheckedUpdateManyWithoutCartNestedInput
  }

  export type CartCreateWithoutAppliedPromoCodeInput = {
    tempCartId?: string | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutCartInput
    shippingAddress?: AddressCreateNestedOneWithoutCartsInput
    items?: CartItemCreateNestedManyWithoutCartInput
    checkoutSessions?: CheckoutSessionCreateNestedManyWithoutCartInput
  }

  export type CartUncheckedCreateWithoutAppliedPromoCodeInput = {
    id?: number
    userId?: string | null
    tempCartId?: string | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    shippingAddressId?: number | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: CartItemUncheckedCreateNestedManyWithoutCartInput
    checkoutSessions?: CheckoutSessionUncheckedCreateNestedManyWithoutCartInput
  }

  export type CartCreateOrConnectWithoutAppliedPromoCodeInput = {
    where: CartWhereUniqueInput
    create: XOR<CartCreateWithoutAppliedPromoCodeInput, CartUncheckedCreateWithoutAppliedPromoCodeInput>
  }

  export type CartCreateManyAppliedPromoCodeInputEnvelope = {
    data: CartCreateManyAppliedPromoCodeInput | CartCreateManyAppliedPromoCodeInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutPromoCodeInput = {
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
    user: UserCreateNestedOneWithoutOrdersInput
    address?: AddressCreateNestedOneWithoutOrdersInput
    promoUsages?: PromoCodeUsageCreateNestedManyWithoutOrderInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutPromoCodeInput = {
    id?: number
    userId: string
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    addressId?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
    promoUsages?: PromoCodeUsageUncheckedCreateNestedManyWithoutOrderInput
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutPromoCodeInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutPromoCodeInput, OrderUncheckedCreateWithoutPromoCodeInput>
  }

  export type OrderCreateManyPromoCodeInputEnvelope = {
    data: OrderCreateManyPromoCodeInput | OrderCreateManyPromoCodeInput[]
    skipDuplicates?: boolean
  }

  export type PromoCodeUsageCreateWithoutPromoCodeInput = {
    discountApplied: number
    orderAmount: number
    status: string
    failureReason?: string | null
    usedAt?: Date | string
    user: UserCreateNestedOneWithoutPromoUsagesInput
    order?: OrderCreateNestedOneWithoutPromoUsagesInput
  }

  export type PromoCodeUsageUncheckedCreateWithoutPromoCodeInput = {
    id?: number
    userId: string
    orderId?: number | null
    discountApplied: number
    orderAmount: number
    status: string
    failureReason?: string | null
    usedAt?: Date | string
  }

  export type PromoCodeUsageCreateOrConnectWithoutPromoCodeInput = {
    where: PromoCodeUsageWhereUniqueInput
    create: XOR<PromoCodeUsageCreateWithoutPromoCodeInput, PromoCodeUsageUncheckedCreateWithoutPromoCodeInput>
  }

  export type PromoCodeUsageCreateManyPromoCodeInputEnvelope = {
    data: PromoCodeUsageCreateManyPromoCodeInput | PromoCodeUsageCreateManyPromoCodeInput[]
    skipDuplicates?: boolean
  }

  export type CartUpsertWithWhereUniqueWithoutAppliedPromoCodeInput = {
    where: CartWhereUniqueInput
    update: XOR<CartUpdateWithoutAppliedPromoCodeInput, CartUncheckedUpdateWithoutAppliedPromoCodeInput>
    create: XOR<CartCreateWithoutAppliedPromoCodeInput, CartUncheckedCreateWithoutAppliedPromoCodeInput>
  }

  export type CartUpdateWithWhereUniqueWithoutAppliedPromoCodeInput = {
    where: CartWhereUniqueInput
    data: XOR<CartUpdateWithoutAppliedPromoCodeInput, CartUncheckedUpdateWithoutAppliedPromoCodeInput>
  }

  export type CartUpdateManyWithWhereWithoutAppliedPromoCodeInput = {
    where: CartScalarWhereInput
    data: XOR<CartUpdateManyMutationInput, CartUncheckedUpdateManyWithoutAppliedPromoCodeInput>
  }

  export type OrderUpsertWithWhereUniqueWithoutPromoCodeInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutPromoCodeInput, OrderUncheckedUpdateWithoutPromoCodeInput>
    create: XOR<OrderCreateWithoutPromoCodeInput, OrderUncheckedCreateWithoutPromoCodeInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutPromoCodeInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutPromoCodeInput, OrderUncheckedUpdateWithoutPromoCodeInput>
  }

  export type OrderUpdateManyWithWhereWithoutPromoCodeInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutPromoCodeInput>
  }

  export type PromoCodeUsageUpsertWithWhereUniqueWithoutPromoCodeInput = {
    where: PromoCodeUsageWhereUniqueInput
    update: XOR<PromoCodeUsageUpdateWithoutPromoCodeInput, PromoCodeUsageUncheckedUpdateWithoutPromoCodeInput>
    create: XOR<PromoCodeUsageCreateWithoutPromoCodeInput, PromoCodeUsageUncheckedCreateWithoutPromoCodeInput>
  }

  export type PromoCodeUsageUpdateWithWhereUniqueWithoutPromoCodeInput = {
    where: PromoCodeUsageWhereUniqueInput
    data: XOR<PromoCodeUsageUpdateWithoutPromoCodeInput, PromoCodeUsageUncheckedUpdateWithoutPromoCodeInput>
  }

  export type PromoCodeUsageUpdateManyWithWhereWithoutPromoCodeInput = {
    where: PromoCodeUsageScalarWhereInput
    data: XOR<PromoCodeUsageUpdateManyMutationInput, PromoCodeUsageUncheckedUpdateManyWithoutPromoCodeInput>
  }

  export type PromoCodeCreateWithoutUserUsagesInput = {
    code: string
    name?: string | null
    description?: string | null
    discountCents?: number | null
    discountPercentage?: number | null
    minOrderAmount?: number
    maxDiscountAmount?: number | null
    maxUses?: number | null
    maxUsesPerUser?: number
    validFrom?: Date | string
    validTo?: Date | string | null
    isPublic?: boolean
    isActive?: boolean
    isFirstTimeOnly?: boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: number
    createdBy?: string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    carts?: CartCreateNestedManyWithoutAppliedPromoCodeInput
    orders?: OrderCreateNestedManyWithoutPromoCodeInput
  }

  export type PromoCodeUncheckedCreateWithoutUserUsagesInput = {
    id?: number
    code: string
    name?: string | null
    description?: string | null
    discountCents?: number | null
    discountPercentage?: number | null
    minOrderAmount?: number
    maxDiscountAmount?: number | null
    maxUses?: number | null
    maxUsesPerUser?: number
    validFrom?: Date | string
    validTo?: Date | string | null
    isPublic?: boolean
    isActive?: boolean
    isFirstTimeOnly?: boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: number
    createdBy?: string | null
    lastUsedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    carts?: CartUncheckedCreateNestedManyWithoutAppliedPromoCodeInput
    orders?: OrderUncheckedCreateNestedManyWithoutPromoCodeInput
  }

  export type PromoCodeCreateOrConnectWithoutUserUsagesInput = {
    where: PromoCodeWhereUniqueInput
    create: XOR<PromoCodeCreateWithoutUserUsagesInput, PromoCodeUncheckedCreateWithoutUserUsagesInput>
  }

  export type UserCreateWithoutPromoUsagesInput = {
    id: string
    email: string
    name?: string | null
    provider?: string | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    cart?: CartCreateNestedOneWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPromoUsagesInput = {
    id: string
    email: string
    name?: string | null
    provider?: string | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    cart?: CartUncheckedCreateNestedOneWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPromoUsagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPromoUsagesInput, UserUncheckedCreateWithoutPromoUsagesInput>
  }

  export type OrderCreateWithoutPromoUsagesInput = {
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
    user: UserCreateNestedOneWithoutOrdersInput
    promoCode?: PromoCodeCreateNestedOneWithoutOrdersInput
    address?: AddressCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutPromoUsagesInput = {
    id?: number
    userId: string
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeId?: number | null
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    addressId?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutPromoUsagesInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutPromoUsagesInput, OrderUncheckedCreateWithoutPromoUsagesInput>
  }

  export type PromoCodeUpsertWithoutUserUsagesInput = {
    update: XOR<PromoCodeUpdateWithoutUserUsagesInput, PromoCodeUncheckedUpdateWithoutUserUsagesInput>
    create: XOR<PromoCodeCreateWithoutUserUsagesInput, PromoCodeUncheckedCreateWithoutUserUsagesInput>
    where?: PromoCodeWhereInput
  }

  export type PromoCodeUpdateToOneWithWhereWithoutUserUsagesInput = {
    where?: PromoCodeWhereInput
    data: XOR<PromoCodeUpdateWithoutUserUsagesInput, PromoCodeUncheckedUpdateWithoutUserUsagesInput>
  }

  export type PromoCodeUpdateWithoutUserUsagesInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discountCents?: NullableIntFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    minOrderAmount?: IntFieldUpdateOperationsInput | number
    maxDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    maxUsesPerUser?: IntFieldUpdateOperationsInput | number
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFirstTimeOnly?: BoolFieldUpdateOperationsInput | boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    carts?: CartUpdateManyWithoutAppliedPromoCodeNestedInput
    orders?: OrderUpdateManyWithoutPromoCodeNestedInput
  }

  export type PromoCodeUncheckedUpdateWithoutUserUsagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discountCents?: NullableIntFieldUpdateOperationsInput | number | null
    discountPercentage?: NullableIntFieldUpdateOperationsInput | number | null
    minOrderAmount?: IntFieldUpdateOperationsInput | number
    maxDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    maxUses?: NullableIntFieldUpdateOperationsInput | number | null
    maxUsesPerUser?: IntFieldUpdateOperationsInput | number
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFirstTimeOnly?: BoolFieldUpdateOperationsInput | boolean
    allowedCategories?: NullableJsonNullValueInput | InputJsonValue
    excludedCategories?: NullableJsonNullValueInput | InputJsonValue
    allowedProducts?: NullableJsonNullValueInput | InputJsonValue
    excludedProducts?: NullableJsonNullValueInput | InputJsonValue
    usageCount?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    carts?: CartUncheckedUpdateManyWithoutAppliedPromoCodeNestedInput
    orders?: OrderUncheckedUpdateManyWithoutPromoCodeNestedInput
  }

  export type UserUpsertWithoutPromoUsagesInput = {
    update: XOR<UserUpdateWithoutPromoUsagesInput, UserUncheckedUpdateWithoutPromoUsagesInput>
    create: XOR<UserCreateWithoutPromoUsagesInput, UserUncheckedCreateWithoutPromoUsagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPromoUsagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPromoUsagesInput, UserUncheckedUpdateWithoutPromoUsagesInput>
  }

  export type UserUpdateWithoutPromoUsagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    cart?: CartUpdateOneWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPromoUsagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    cart?: CartUncheckedUpdateOneWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrderUpsertWithoutPromoUsagesInput = {
    update: XOR<OrderUpdateWithoutPromoUsagesInput, OrderUncheckedUpdateWithoutPromoUsagesInput>
    create: XOR<OrderCreateWithoutPromoUsagesInput, OrderUncheckedCreateWithoutPromoUsagesInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutPromoUsagesInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutPromoUsagesInput, OrderUncheckedUpdateWithoutPromoUsagesInput>
  }

  export type OrderUpdateWithoutPromoUsagesInput = {
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    promoCode?: PromoCodeUpdateOneWithoutOrdersNestedInput
    address?: AddressUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutPromoUsagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    addressId?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyUserInput = {
    id?: number
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeId?: number | null
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    addressId?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
  }

  export type AddressCreateManyUserInput = {
    id?: number
    firstName: string
    lastName: string
    company?: string | null
    line1: string
    line2?: string | null
    city: string
    state: string
    country?: string
    postalCode: string
    phone?: string | null
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PromoCodeUsageCreateManyUserInput = {
    id?: number
    promoCodeId: number
    orderId?: number | null
    discountApplied: number
    orderAmount: number
    status: string
    failureReason?: string | null
    usedAt?: Date | string
  }

  export type OrderUpdateWithoutUserInput = {
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
    promoCode?: PromoCodeUpdateOneWithoutOrdersNestedInput
    address?: AddressUpdateOneWithoutOrdersNestedInput
    promoUsages?: PromoCodeUsageUpdateManyWithoutOrderNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    addressId?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
    promoUsages?: PromoCodeUsageUncheckedUpdateManyWithoutOrderNestedInput
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    addressId?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
  }

  export type AddressUpdateWithoutUserInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutAddressNestedInput
    carts?: CartUpdateManyWithoutShippingAddressNestedInput
  }

  export type AddressUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutAddressNestedInput
    carts?: CartUncheckedUpdateManyWithoutShippingAddressNestedInput
  }

  export type AddressUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUsageUpdateWithoutUserInput = {
    discountApplied?: IntFieldUpdateOperationsInput | number
    orderAmount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCode?: PromoCodeUpdateOneRequiredWithoutUserUsagesNestedInput
    order?: OrderUpdateOneWithoutPromoUsagesNestedInput
  }

  export type PromoCodeUsageUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    discountApplied?: IntFieldUpdateOperationsInput | number
    orderAmount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUsageUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    discountApplied?: IntFieldUpdateOperationsInput | number
    orderAmount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemCreateManyCartInput = {
    id?: number
    variantId: string
    quantity: number
    addedAt?: Date | string
    updatedAt?: Date | string
  }

  export type CheckoutSessionCreateManyCartInput = {
    id?: number
    stripeSessionId: string
    subtotal: number
    estimatedTax: number
    estimatedShipping: number
    promoDiscount: number
    estimatedTotal: number
    finalTax?: number | null
    finalShipping?: number | null
    finalTotal?: number | null
    status?: string
    stripeEventId?: string | null
    webhookProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartItemUpdateWithoutCartInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variant?: VariantUpdateOneRequiredWithoutCartItemsNestedInput
  }

  export type CartItemUncheckedUpdateWithoutCartInput = {
    id?: IntFieldUpdateOperationsInput | number
    variantId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemUncheckedUpdateManyWithoutCartInput = {
    id?: IntFieldUpdateOperationsInput | number
    variantId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSessionUpdateWithoutCartInput = {
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    estimatedTax?: IntFieldUpdateOperationsInput | number
    estimatedShipping?: IntFieldUpdateOperationsInput | number
    promoDiscount?: IntFieldUpdateOperationsInput | number
    estimatedTotal?: IntFieldUpdateOperationsInput | number
    finalTax?: NullableIntFieldUpdateOperationsInput | number | null
    finalShipping?: NullableIntFieldUpdateOperationsInput | number | null
    finalTotal?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    stripeEventId?: NullableStringFieldUpdateOperationsInput | string | null
    webhookProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSessionUncheckedUpdateWithoutCartInput = {
    id?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    estimatedTax?: IntFieldUpdateOperationsInput | number
    estimatedShipping?: IntFieldUpdateOperationsInput | number
    promoDiscount?: IntFieldUpdateOperationsInput | number
    estimatedTotal?: IntFieldUpdateOperationsInput | number
    finalTax?: NullableIntFieldUpdateOperationsInput | number | null
    finalShipping?: NullableIntFieldUpdateOperationsInput | number | null
    finalTotal?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    stripeEventId?: NullableStringFieldUpdateOperationsInput | string | null
    webhookProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSessionUncheckedUpdateManyWithoutCartInput = {
    id?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    estimatedTax?: IntFieldUpdateOperationsInput | number
    estimatedShipping?: IntFieldUpdateOperationsInput | number
    promoDiscount?: IntFieldUpdateOperationsInput | number
    estimatedTotal?: IntFieldUpdateOperationsInput | number
    finalTax?: NullableIntFieldUpdateOperationsInput | number | null
    finalShipping?: NullableIntFieldUpdateOperationsInput | number | null
    finalTotal?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    stripeEventId?: NullableStringFieldUpdateOperationsInput | string | null
    webhookProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUsageCreateManyOrderInput = {
    id?: number
    promoCodeId: number
    userId: string
    discountApplied: number
    orderAmount: number
    status: string
    failureReason?: string | null
    usedAt?: Date | string
  }

  export type OrderItemCreateManyOrderInput = {
    id?: number
    variantId: string
    productId: string
    productTitle: string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize: string
    variantColor: string
    variantSku?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    taxAmount?: number | null
    taxRate?: number | null
  }

  export type PromoCodeUsageUpdateWithoutOrderInput = {
    discountApplied?: IntFieldUpdateOperationsInput | number
    orderAmount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCode?: PromoCodeUpdateOneRequiredWithoutUserUsagesNestedInput
    user?: UserUpdateOneRequiredWithoutPromoUsagesNestedInput
  }

  export type PromoCodeUsageUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    discountApplied?: IntFieldUpdateOperationsInput | number
    orderAmount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUsageUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    promoCodeId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    discountApplied?: IntFieldUpdateOperationsInput | number
    orderAmount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUpdateWithoutOrderInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize?: StringFieldUpdateOperationsInput | string
    variantColor?: StringFieldUpdateOperationsInput | string
    variantSku?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    taxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    taxRate?: NullableFloatFieldUpdateOperationsInput | number | null
    variant?: VariantUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    variantId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize?: StringFieldUpdateOperationsInput | string
    variantColor?: StringFieldUpdateOperationsInput | string
    variantSku?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    taxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    taxRate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    variantId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize?: StringFieldUpdateOperationsInput | string
    variantColor?: StringFieldUpdateOperationsInput | string
    variantSku?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    taxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    taxRate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type CartItemCreateManyVariantInput = {
    id?: number
    cartId: number
    quantity: number
    addedAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderItemCreateManyVariantInput = {
    id?: number
    orderId: number
    productId: string
    productTitle: string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize: string
    variantColor: string
    variantSku?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    taxAmount?: number | null
    taxRate?: number | null
  }

  export type CartItemUpdateWithoutVariantInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateOneRequiredWithoutItemsNestedInput
  }

  export type CartItemUncheckedUpdateWithoutVariantInput = {
    id?: IntFieldUpdateOperationsInput | number
    cartId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemUncheckedUpdateManyWithoutVariantInput = {
    id?: IntFieldUpdateOperationsInput | number
    cartId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUpdateWithoutVariantInput = {
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize?: StringFieldUpdateOperationsInput | string
    variantColor?: StringFieldUpdateOperationsInput | string
    variantSku?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    taxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    taxRate?: NullableFloatFieldUpdateOperationsInput | number | null
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutVariantInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize?: StringFieldUpdateOperationsInput | string
    variantColor?: StringFieldUpdateOperationsInput | string
    variantSku?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    taxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    taxRate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type OrderItemUncheckedUpdateManyWithoutVariantInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    productId?: StringFieldUpdateOperationsInput | string
    productTitle?: StringFieldUpdateOperationsInput | string
    images?: NullableJsonNullValueInput | InputJsonValue
    variantSize?: StringFieldUpdateOperationsInput | string
    variantColor?: StringFieldUpdateOperationsInput | string
    variantSku?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    taxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    taxRate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type VariantCreateManyProductInput = {
    id: string
    size: string
    color: string
    stockQuantity: number
    sku?: string | null
    sanityRevisionId?: string | null
    lastSyncedAt: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VariantUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cartItems?: CartItemUpdateManyWithoutVariantNestedInput
    orderItems?: OrderItemUpdateManyWithoutVariantNestedInput
  }

  export type VariantUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cartItems?: CartItemUncheckedUpdateManyWithoutVariantNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type VariantUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    sanityRevisionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyAddressInput = {
    id?: number
    userId: string
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeId?: number | null
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
  }

  export type CartCreateManyShippingAddressInput = {
    id?: number
    userId?: string | null
    tempCartId?: string | null
    appliedPromoCodeId?: number | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateWithoutAddressInput = {
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    promoCode?: PromoCodeUpdateOneWithoutOrdersNestedInput
    promoUsages?: PromoCodeUsageUpdateManyWithoutOrderNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutAddressInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
    promoUsages?: PromoCodeUsageUncheckedUpdateManyWithoutOrderNestedInput
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutAddressInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
  }

  export type CartUpdateWithoutShippingAddressInput = {
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCartNestedInput
    appliedPromoCode?: PromoCodeUpdateOneWithoutCartsNestedInput
    items?: CartItemUpdateManyWithoutCartNestedInput
    checkoutSessions?: CheckoutSessionUpdateManyWithoutCartNestedInput
  }

  export type CartUncheckedUpdateWithoutShippingAddressInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    appliedPromoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CartItemUncheckedUpdateManyWithoutCartNestedInput
    checkoutSessions?: CheckoutSessionUncheckedUpdateManyWithoutCartNestedInput
  }

  export type CartUncheckedUpdateManyWithoutShippingAddressInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    appliedPromoCodeId?: NullableIntFieldUpdateOperationsInput | number | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartCreateManyAppliedPromoCodeInput = {
    id?: number
    userId?: string | null
    tempCartId?: string | null
    promoDiscountAmount?: number | null
    promoAppliedAt?: Date | string | null
    requiresPromoVerification?: boolean
    shippingMethod?: string | null
    shippingAddressId?: number | null
    stripeCheckoutSessionId?: string | null
    checkoutStatus?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyPromoCodeInput = {
    id?: number
    userId: string
    shippingAddress: JsonNullValueInput | InputJsonValue
    shippingMethod: string
    shippingCost: number
    stripeSessionId: string
    stripeCustomerId?: string | null
    paymentIntentId: string
    subtotal: number
    discountAmount: number
    taxAmount: number
    amountTotal: number
    currency?: string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status: string
    trackingCode?: string | null
    trackingNumber?: string | null
    trackingUrl?: string | null
    labelUrl?: string | null
    deliveryDate?: Date | string | null
    deliveryDays?: number | null
    methodShipped?: string | null
    carrier?: string | null
    shipmentCost?: number | null
    estimatedDelivery?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    promoCodeUsed?: string | null
    promoDiscount?: number | null
    addressId?: number | null
    refundReason?: string | null
    refundedAt?: Date | string | null
    firstName: string
    lastName: string
    orderEmail: string
  }

  export type PromoCodeUsageCreateManyPromoCodeInput = {
    id?: number
    userId: string
    orderId?: number | null
    discountApplied: number
    orderAmount: number
    status: string
    failureReason?: string | null
    usedAt?: Date | string
  }

  export type CartUpdateWithoutAppliedPromoCodeInput = {
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCartNestedInput
    shippingAddress?: AddressUpdateOneWithoutCartsNestedInput
    items?: CartItemUpdateManyWithoutCartNestedInput
    checkoutSessions?: CheckoutSessionUpdateManyWithoutCartNestedInput
  }

  export type CartUncheckedUpdateWithoutAppliedPromoCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddressId?: NullableIntFieldUpdateOperationsInput | number | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CartItemUncheckedUpdateManyWithoutCartNestedInput
    checkoutSessions?: CheckoutSessionUncheckedUpdateManyWithoutCartNestedInput
  }

  export type CartUncheckedUpdateManyWithoutAppliedPromoCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    tempCartId?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscountAmount?: NullableIntFieldUpdateOperationsInput | number | null
    promoAppliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requiresPromoVerification?: BoolFieldUpdateOperationsInput | boolean
    shippingMethod?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddressId?: NullableIntFieldUpdateOperationsInput | number | null
    stripeCheckoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutStatus?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutPromoCodeInput = {
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    address?: AddressUpdateOneWithoutOrdersNestedInput
    promoUsages?: PromoCodeUsageUpdateManyWithoutOrderNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutPromoCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    addressId?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
    promoUsages?: PromoCodeUsageUncheckedUpdateManyWithoutOrderNestedInput
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutPromoCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    shippingAddress?: JsonNullValueInput | InputJsonValue
    shippingMethod?: StringFieldUpdateOperationsInput | string
    shippingCost?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: StringFieldUpdateOperationsInput | string
    subtotal?: IntFieldUpdateOperationsInput | number
    discountAmount?: IntFieldUpdateOperationsInput | number
    taxAmount?: IntFieldUpdateOperationsInput | number
    amountTotal?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    taxCalculation?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    trackingCode?: NullableStringFieldUpdateOperationsInput | string | null
    trackingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    trackingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    labelUrl?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryDays?: NullableIntFieldUpdateOperationsInput | number | null
    methodShipped?: NullableStringFieldUpdateOperationsInput | string | null
    carrier?: NullableStringFieldUpdateOperationsInput | string | null
    shipmentCost?: NullableIntFieldUpdateOperationsInput | number | null
    estimatedDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promoCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    promoDiscount?: NullableIntFieldUpdateOperationsInput | number | null
    addressId?: NullableIntFieldUpdateOperationsInput | number | null
    refundReason?: NullableStringFieldUpdateOperationsInput | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    orderEmail?: StringFieldUpdateOperationsInput | string
  }

  export type PromoCodeUsageUpdateWithoutPromoCodeInput = {
    discountApplied?: IntFieldUpdateOperationsInput | number
    orderAmount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPromoUsagesNestedInput
    order?: OrderUpdateOneWithoutPromoUsagesNestedInput
  }

  export type PromoCodeUsageUncheckedUpdateWithoutPromoCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    discountApplied?: IntFieldUpdateOperationsInput | number
    orderAmount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromoCodeUsageUncheckedUpdateManyWithoutPromoCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    discountApplied?: IntFieldUpdateOperationsInput | number
    orderAmount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    usedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}