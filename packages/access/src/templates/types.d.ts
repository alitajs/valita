export interface AccessReturn {
    setRole: (role: Promise<any> | string) => void;
    hasAccess: ComputedRefImpl;
    currentRole: ComputedRefImpl;
}