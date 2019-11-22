export function Reject(): MethodDecorator {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {};
}
