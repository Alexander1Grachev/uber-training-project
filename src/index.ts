import express from 'express'
const app = express()
const port = 3003

const http_statuses = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

const db = {
    courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'qa' },
        { id: 4, title: 'devops' }
    ]
}

app.get('/courses', (req, res) => {
    let foundCoursesQuery = db.courses

    if (req.query.title) {
        const title = (req.query.title as string).toLowerCase()
        foundCoursesQuery = foundCoursesQuery.filter(c =>
            c.title.toLowerCase().includes(title)
        )
    }

    res.json(foundCoursesQuery)
})
app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === +req.params.id)

    if (!foundCourse) {
        res.status(http_statuses.NOT_FOUND_404).json({ error: 'Course not found' });
        return
    }
    res.json(foundCourse)
})
app.post('/courses/', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(http_statuses.BAD_REQUEST_400)
        return;
    }
    const createdCourse = {
        id: +(new Date()),
        title: req.body.title
    }
    db.courses.push(createdCourse)
    console.log(createdCourse)
    res.status(http_statuses.CREATED_201).json(createdCourse)

})
app.delete('/courses/:id', (req, res) => {
    const courseId = +req.params.id
    const initialLength = db.courses.length

    db.courses = db.courses.filter(c => c.id !== courseId)

    if (db.courses.length === initialLength) {
        res.sendStatus(http_statuses.NOT_FOUND_404)
        return
    }

    res.status(http_statuses.OK_200).json(db.courses)
})
app.put('/courses/:id', (req, res) => {
        if (!req.body.title) {
        res.sendStatus(http_statuses.BAD_REQUEST_400)
        return;
    }//валидация,  вставляем в начала чтобы
    //если title не передали дальше ничего не искали мы

    const foundCourse = db.courses.find(c => c.id === +req.params.id)
    if (!foundCourse) {
        res.status(http_statuses.NOT_FOUND_404).json({ error: 'Course not found' });
        return
    }
    foundCourse.title = req.body.title;
    res.sendStatus(http_statuses.NO_CONTENT_204)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})