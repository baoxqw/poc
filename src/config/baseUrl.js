const baseUrl = process.env.NODE_ENV === 'production' ? '/' : '/api'
console.log('==process.env.NODE_ENV=',process.env.NODE_ENV)
export default baseUrl
