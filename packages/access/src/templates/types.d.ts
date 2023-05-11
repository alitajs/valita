export interface AccessInfo {
    accessIds: string[],
    role: string
}
export interface AccessReturn {
    setRole: (role: Promise<string> | string) => void;
    setAccess: (role: Promise<string[]> | string[] | AccessInfo) => void;
    hasAccess: ComputedRefImpl;
    currentRole: ComputedRefImpl;
}