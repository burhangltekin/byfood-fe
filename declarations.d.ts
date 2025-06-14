// Before: No type declarations for CSS modules
// After: Add a global declaration for CSS modules

// File:declarations.d.ts
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}