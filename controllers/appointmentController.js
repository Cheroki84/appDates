const AppointmentModel = require('../models/appointment');
const UserModel = require('../models/user');


const AppointmentController = {
    async addOne(req, res) {
        let user = await UserModel.findOne({
            email: req.body.email
        });

        if (!user.token) {
            res.status(400).send({
                message: 'Debes estar logeado'
            });

        }else{
        try {
            const appointment = await AppointmentModel({
                status: req.body.status,
                date: req.body.date,
                token_id: user.token
            }).save();
            res.status(201).send(
                appointment
            );
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error,
                message: 'Error tal'
            })
        }}

    },
    async deleteOne(req, res) {
        try {
            const appointment = await AppointmentModel.findByIdAndDelete({
                _id: req.params._id
            })
            res.send({
                message: 'cita borrada',
                appointment
            })
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'error al borrar la cita'
            })
            
        }
    }

}

module.exports = AppointmentController;