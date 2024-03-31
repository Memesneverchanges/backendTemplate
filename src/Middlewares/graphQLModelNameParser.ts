export function graphQLModelNameParser(req,res, next: () => void) {
    console.log(req.body.query)
    next()
}