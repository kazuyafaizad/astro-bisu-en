declare module "lazysizes";

declare function startup(): void;

interface Config {
    main: string;
    position?: string;
    contents: string;
}
