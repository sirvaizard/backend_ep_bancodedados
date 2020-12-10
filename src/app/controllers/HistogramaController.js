import { sql } from '@databases/pg'
import db from '../../database/index.js'

class HistrogramaController {
  async index(req, res) {
    const racials = await db.query(sql`
      SELECT COUNT(*) FROM racial
    `)

    const religious = await db.query(sql`
      SELECT COUNT(*) FROM religioso
    `)

    const territorials = await db.query(sql`
      SELECT COUNT(*) FROM territorial
    `)

    const economics = await db.query(sql`
      SELECT COUNT(*) FROM economico
    `)

    return res.status(200).json({
      "tipos": [
        "raciais",
        "religiosos",
        "territoriais",
        "economicos"
      ],
      "valores": [
        racials[0].count,
        religious[0].count,
        territorials[0].count,
        economics[0].count
      ]
    })
  }
}

export default new HistrogramaController()