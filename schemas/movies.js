const z = require ('zod')


const movieSchema= z.object({
        title: z.string({
            invalid_type_error: 'El titulo de la pelicula tiene que ser un string',
            required_error: 'El titulo es requerido',
        }),
        year: z.number().int().min(1900).max(2025),
        director: z.string(),
        duration: z.number().int().positive(),
        rate: z.number().min(0).max(10).default(5),
        poster: z.string().url({
            message:'El poster tiene que ser una URL valida'
        }),
        genre: z.array(
            z.enum(['Action','Adventure','Comedy','Drama','Crime']),{
                required_error: 'el genero es necesario',
                invalid_type_error: 'Genero tiene que ser un array'
            }
        )

    })

    function validateMovie(input){
        return movieSchema.safeParse(input)
    }

    function validatePartialMovie (input) {
         return movieSchema.partial().safeParse(input)
}

    module.exports={
        validateMovie,
        validatePartialMovie
    }