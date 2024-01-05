export interface Dictionary<T> {
    [index: string]: T;
}

export enum ItemType {
    info = 'info',
    instruction = 'instruction',
    warning = 'warning',
    action = 'action',
    pending = 'pending',
    success = 'success',
    error = 'error',
    disabled = 'disabled',
    primary = 'primary',
    secondary = 'secondary',
}