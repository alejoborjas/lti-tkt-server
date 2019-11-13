module.exports = (app, db) => {
    // Programs
    app.get('/api/programs', (req, res) => {
        db.Program.findAll()
            .then((programs) => res.send(programs))
            .catch((err) => {
                console.log('There was an error getting programs:', JSON.stringify(err));
                return res.status(400).send(err);
            });
    });
    app.post('/api/programs', (req, res) => {
        const { name, description } = req.body;
        return db.Program.create({ name, description })
            .then((program) => res.status(201).send(program))
            .catch((err) => {
                console.log('There was an error creating a program:', JSON.stringify(err));
                return res.status(400).send(err);
            });
    });
    app.delete('/api/programs/:id', (req, res) => {
        const id = parseInt(req.params.id);
        return db.Program.findByPk(id)
            .then((program) => program.destroy())
            .then(() => res.send({ id }))
            .catch((err) => {
                console.log('There was an error deleting a program:', JSON.stringify(err));
                res.status(400).send(err);
            });
    });
    app.put('/api/programs/:id', (req, res) => {
        const id = parseInt(req.params.id);
        return db.Program.findByPk(id).then((program) => {
            const { name, description } = req.body;
            return program
                .update({ name, description })
                .then(() => res.send(program))
                .catch((err) => {
                    console.log('There was an error updating a program:', JSON.stringify(err));
                    res.status(400).send(err);
                });
        });
    });

    // Rules
    app.get('/api/rules', (req, res) => {
        db.Rule.findAll()
            .then((rules) => res.send(rules))
            .catch((err) => {
                console.log('There was an error getting rules:', JSON.stringify(err));
                return res.send(err);
            });
    });
    app.post('/api/rules', (req, res) => {
        const { name, template, type, language, programId, includeDynamicDate, description } = req.body;
        return db.Rule.create({
            name,
            template,
            type,
            language,
            programId,
            includeDynamicDate,
            description
        })
            .then((rule) => res.send(rule))
            .catch((err) => {
                console.log('There was an error creating a rule:', JSON.stringify(err));
                return res.status(400).send(err);
            });
    });
    app.delete('/api/rules/:id', (req, res) => {
        const id = parseInt(req.params.id);
        return db.Rule.findByPk(id)
            .then((rule) => rule.destroy())
            .then(() => res.send({ id }))
            .catch((err) => {
                console.log('There was an error deleting a rule:', JSON.stringify(err));
                res.status(400).send(err);
            });
    });
    app.put('/api/rules/:id', (req, res) => {
        const id = parseInt(req.params.id);
        return db.Rule.findByPk(id).then((rule) => {
            const { name, template, type, language, programId, includeDynamicDate, description } = req.body;
            return rule
                .update({
                    name,
                    template,
                    type,
                    language,
                    programId,
                    includeDynamicDate,
                    description
                })
                .then(() => res.send(rule))
                .catch((err) => {
                    console.log('There was an error updating a rule:', JSON.stringify(err));
                    res.status(400).send(err);
                });
        });
    });
};
