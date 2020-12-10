import { sql } from '@databases/pg'
import db from '../../database/index.js'

class TopController {
  async conflicts(req, res) {
    const response = await db.query(sql`
      SELECT * FROM conflito 
      ORDER BY num_mortos DESC
      LIMIT 5
    `)

    return res.status(200).json(response)
  }

  async organizations(req, res) {
    const response = await db.query(sql`
      SELECT num_mediacoes_query.mediacoes, cod_organizacao, nome, tipo_org, tipo_ajuda FROM (
        SELECT COUNT(cod_conflito) AS mediacoes, cod_organizacao 
        FROM media
        GROUP BY cod_organizacao
      ) AS num_mediacoes_query NATURAL JOIN organizacao_mediadora
      ORDER BY mediacoes DESC
      LIMIT 5
    `)

    return res.status(200).json(response)
  }

  async armed_group(req, res) {
    const response = await db.query(sql`
      SELECT cod_grupo, num_armas_query.num_armas, nome FROM (
        SELECT SUM(num_armas) AS num_armas, cod_grupo
        FROM fornece
        GROUP BY cod_grupo
      ) AS num_armas_query NATURAL JOIN grupo_armado
      ORDER BY num_armas DESC
      LIMIT 5
    `)

    return res.status(200).json(response)
  }

  async religious_conflict(req, res) {
    const response = await db.query(sql`
      SELECT COUNT(nome) AS num_conflitos, nome FROM (
        SELECT * from pais_conflito NATURAL JOIN religioso
      ) AS num_conflitos_query
      GROUP BY nome
      ORDER BY num_conflitos DESC
      LIMIT 1
    `)

    return res.status(200).json(response[0])
  }
}

export default new TopController()