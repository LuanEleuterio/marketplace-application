const authHelper = {
    setCookiesAuth: async (auth, res) => {
        res.cookie('token', auth.token, {
            maxAge: 86400 * 1000, // 24 hours
        });

        res.cookie('_luaneletro-logged', true, {
            maxAge: 86400 * 1000, // 24 hours
        });

        if(auth.type === "USER"){

            res.cookie('user-id', auth.userId, {
                maxAge: 86400 * 1000, // 24 hours
            });

            res.cookie('_luaneletro-user-type', auth.type, {
                maxAge: 86400 * 1000, // 24 hours
            });

        }else{
            res.cookie('partner-id', auth.userId, {
                maxAge: 86400 * 1000, // 24 hours
            });

            res.cookie('_luaneletro-user-type', auth.type, {
                maxAge: 86400 * 1000, // 24 hours
            });
        }
    }
}

module.exports = authHelper