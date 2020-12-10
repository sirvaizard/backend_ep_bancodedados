import { sql } from '@databases/pg'
import db from '../../database/index.js'

const typesConflicts = ['economico', 'racial', 'territorial', 'religioso']

class ConflitoController {
  async store(req, res) {
    const { nome, num_feridos, num_mortos, tipo } = req.body

    if (!typesConflicts.find(type => type === tipo))
      return res.status(400).json({
        "erro": "Tipo de conflito inválido."
      })

    const conflictExists = await db.query(sql`
      SELECT * FROM conflito WHERE nome = ${nome}
    `)

    if (conflictExists.length > 0)
      return res.status(400).json({
        "erro": "Conflito já existe."
      })

    await db.query(sql`
      INSERT INTO conflito (nome, num_feridos, num_mortos)
      VALUES (${nome}, ${num_feridos}, ${num_mortos})
    `)

    const response = await db.query(sql`
      SELECT cod_conflito FROM conflito
      WHERE nome = ${nome}
    `)

    const { cod_conflito } = response[0]

    switch (tipo) {
      case 'economico':
        const { materia_prima } = req.body

        if (!materia_prima)
          return res.status(400).json({
            "erro": "Matéria prima inválida"
          })

        await db.query(sql`
          INSERT INTO economico (cod_conflito, materia_prima)
          VALUES (${cod_conflito}, ${materia_prima})
        `)
        break

      case 'racial':
        const { raca_atingida } = req.body

        if (!raca_atingida)
          return res.status(400).json({
            "erro": "Raça inválida"
          })

        await db.query(sql`
          INSERT INTO racial (cod_conflito, raca_atingida)
          VALUES (${cod_conflito}, ${raca_atingida})
        `)
        break

      case 'territorial':
        const { regiao_atingida } = req.body

        if (!regiao_atingida)
          return res.status(400).json({
            "erro": "região inválida"
          })

        await db.query(sql`
          INSERT INTO territorial (cod_conflito, regiao_atingida)
          VALUES (${cod_conflito}, ${regiao_atingida})
        `)
        break

      case 'religioso':
        const { religiao_atingida } = req.body

        if (!religiao_atingida)
          return res.status(400).json({
            "erro": "Religião inválida"
          })

        await db.query(sql`
          INSERT INTO religioso (cod_conflito, religiao_atingida)
          VALUES (${cod_conflito}, ${religiao_atingida})
        `)
        break
    }

    return res.status(200).json({
      "msg": "Conflito criado com sucesso."
    })
  }
}

export default new ConflitoController()