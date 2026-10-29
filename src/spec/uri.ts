export function applyTemplate(template: string, args: Record<string, any>): string {
    return template.replace(/\${(\w+)}/g, (match, key) => args[key] || match);
}