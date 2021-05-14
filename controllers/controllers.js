const sql = require("mssql");
const config = require("../database/config");

const getCredit = (req, res) => {
    sql.connect(config, (err) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            var request = new sql.Request();
            request.query(`SELECT * FROM Accounts WHERE Accounts.id = '${req.params.id}'`, (e, r) => {
                if (e) {
                    res.status(400).send(e.message);
                } else {
                    if (r.recordset.length === 0) {
                        res.status(200).send(false);
                    } else {
                        if (req.params.money > r.recordset[0].credit) {
                            res.status(200).send(false);
                        } else {
                            res.status(200).send(true);    
                        }
                    }
                }
            });
        }
    });
} 

const updateAccount = (req, res) => {
    sql.connect(config, (err) => {
        if (err) {
            res.status(400).send(err.message);

        } else {
            var request = new sql.Request();
            var data = req.body;
            request.query(`UPDATE Accounts SET credit = (credit - ${data.money}) WHERE id = '${data.id}'`, (e, r) => {
                if (e) {
                    res.status(400).send(`Request error: ${e.message}`);
                } else {
                    res.status(200).send(true);
                }
            });
        }
    });
}

const beginTrans = (req, res) => {
    sql.connect(config, (err) => {
        if (err) {
            res.status(400).send(err.message);

        } else {
            var request = new sql.Request();
            request.query(`BEGIN TRAN`, (e, r) => {
                if (e) {
                    res.status(400).send(`Request error: ${e.message}`);
                } else {
                    res.status(200).send(true);
                }
            });
        }
    });
}

const commitTrans = (req, res) => {
    sql.connect(config, (err) => {
        if (err) {
            res.status(400).send(err.message);

        } else {
            var request = new sql.Request();
            request.query(`COMMIT`, (e, r) => {
                if (e) {
                    res.status(400).send(`Request error: ${e.message}`);
                } else {
                    res.status(200).send(true);
                }
            });
        }
    });
}

const rollbackTrans = (req, res) => {
    sql.connect(config, (err) => {
        if (err) {
            res.status(400).send(err.message);

        } else {
            var request = new sql.Request();
            request.query(`ROLLBACK`, (e, r) => {
                if (e) {
                    res.status(400).send(`Request error: ${e.message}`);
                } else {
                    res.status(200).send(true);
                }
            });
        }
    });
}

module.exports = {
    getCredit, 
    updateAccount, 
    beginTrans, 
    commitTrans, 
    rollbackTrans
}