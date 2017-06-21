export default function loggerMiddleware(store: any) {
    return (
        (next: any) => (action: any) => {
            console.log(action);
            return next(action);
        });
}
