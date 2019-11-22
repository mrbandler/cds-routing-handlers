/**
 * Container to be used by this library for inversion control. If container was not implicitly set then by default
 * container simply creates a new instance of the given class.
 */
const defaultContainer: { get<T>(someClass: { new (...args: any[]): T } | Function): T } = new (class {
    private instances: { type: Function; object: any }[] = [];
    get<T>(someClass: { new (...args: any[]): T }): T {
        let instance = this.instances.find(instance => instance.type === someClass);
        if (!instance) {
            instance = { type: someClass, object: new someClass() };
            this.instances.push(instance);
        }

        return instance.object;
    }
})();

let userContainer: { get<T>(someClass: { new (...args: any[]): T } | Function): T };

/**
 * Gets the IOC container used by this library.
 */
export function getFromContainer<T>(someClass: { new (...args: any[]): T } | Function): T {
    const instance = userContainer.get(someClass);
    if (instance) return instance;
    return defaultContainer.get<T>(someClass);
}
