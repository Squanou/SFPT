const { Client, Intents } = require('discord.js');

class SFPT extends Client {
    constructor(option) {
        super(option)
        this.config = require('../config.json')
        this.guild = require("../models/guilds/guilds")
        this.spam = require("../models/guilds/allowspam")
        this.role = require('../models/guilds/role')
        this.bot = require("../models/bot/bot")
        this.accountStaff = require('../models/admin/staffAccount')
        this.Ticketrole = require('../models/guilds/role-tickets')
    }

    async GetGuildData(guildID) {
        if (!guildID) throw new Error("No guild ID provided");
        if (isNaN(guildID)) throw new Error("Guild ID is not a valid number");
        let GuildDoc = await this.guild.findOne({
            guildID
        })
        return GuildDoc;
    }

    async GetStaff() {

    }

    async GetAccountData(email) {
        let GuildDoc = await this.accountStaff.findOne({
            email
        })
        return GuildDoc;
    }
    async GetRole() {
        let roledoc = await this.role.find()
        return roledoc
    }
    async GetRoleTicket() {
        let roledoc = await this.Ticketrole.find()
        return roledoc
    }
    async Error({ type, error }, message) {
        if (!type && !error) throw new SyntaxError("Type and error are poorly defined");

        if (!type) throw new TypeError("Type is not specified");

        if (!error) throw new TypeError("Error isn't specified");

        if (type === "db") {
            var DBErrorString;
            DBErrorString = message.reply(`Erreur interne, veuillez réinviter le bot si le problème persiste. (${error})`);

            return DBErrorString
        } else if (type === "args") {
            var ArgsErrorString;
            ArgsErrorString = message.reply(`Erreur d'argument, Arguments possible: ${error}.`);

            return ArgsErrorString
        } else throw new TypeError("Type is not defined")
    }
}
module.exports = SFPT;