import 'reflect-metadata';

interface Type<T> {
    new(...args: Array<any>): T;
}

type GenericClassDecorator<T> = (target: T) => void;

function setupInjectables() {
    let classStore = new Map();

    function inject(instance) {
        let clazz = classStore.get(instance.name || instance);
        if (!clazz) throw ReferenceError('Trying to inject an instance that doesn\'t exist:', );
        return clazz;
    }
    // target: any, key: string, descriptor: TypedPropertyDescriptor<T>
    function injectable<T>(constructor: Type<T>) {
        classStore.set(constructor.name, new constructor());
    }
    return { Inject: inject, Injectable: injectable };
}

export const { Inject, Injectable } = setupInjectables();
