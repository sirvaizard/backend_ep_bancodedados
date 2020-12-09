import { sql } from '@databases/pg'
import db from '../../database/index.js'

class DivisaoController {
  async index(req, res) {
    const response = await db.query(sql`
      SELECT * FROM divisao
    `)

    return res.json(response)
  }

  async store(req, res) {

  }
}

export default new DivisaoController()