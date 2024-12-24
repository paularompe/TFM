router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM foros');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener foros' });
    }
});
