// import { yarg } from './args.plugin';


const runCommand = async (args: string[]) => { //necesario para simular la importación de yargs
    process.argv = [...process.argv, ...args]; //Servirá para añadir argumentos en nuestras pruebas
    const { yarg } = await import('./args.plugin');
    return yarg;
}



describe('Test args.plugin.ts', () => {

    const originalArgv = process.argv;

    beforeEach(() => { //limpieza de los argumentos
        process.argv = originalArgv;
        jest.resetModules(); // con esto limpiamos lo que se inserte como argumento en las pruebas
    });

    test('should return default values', async () => {

        const argv = await runCommand(['-b', '5']);

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }));

    });

    test('should return configuration with custom values', async () => {

        const argv = await runCommand(['-b', '8', '-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-dir']);

        expect(argv).toEqual(expect.objectContaining({
            b: 8,
            l: 20,
            s: true,
            n: 'custom-name',
            d: 'custom-dir',
        }));

    });
});