const leiDeFDS = (req, res, next) => {
    const hoje = new Date().getDay();

    if(hoje === 0 || hoje === 6){
        return res.status(403).json({error: "Somente de segunda a sexta feira !"});

    }
    next();
};

module.exports = leiDeFDS;