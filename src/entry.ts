import express from 'express'
import cors from 'cors'
import { useMysql } from './middlewares/useMysql'
import router from './apis/post'

const app = express()
const PORT = 3714
// 이처럼 절대 변하지 않는 값은 대문자로 상수화 해준다.

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // form데이터 받아들임, body-parser포함
app.use(express.static('public')) // 정적 파일 서비스, 나중에 public 폴더에 이미지같은 정적 파일을 넣어주면 된다.

app.use(useMysql)
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
