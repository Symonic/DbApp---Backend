
//to raczej niepotrzebne

// const { User, Players, Teams, Player_positions, Positions } = require('../../Models/models');

// const CalendarPostEventController = async (req, res) => {
//     try {
//         const date_id = req.body; // Odczytanie właściwości date_id z ciała żądania
//         console.log('Received body:', req.body);
//         if (!date_id) {
//             return res.status(400).json({ message: 'Brak daty w żądaniu' });
//         }
        
//         console.log(`Otrzymano datę: ${date_id}`);

//         res.status(200).json({ message: 'Data odebrana pomyślnie', date: date_id });
//     } catch (error) {
//         return res.status(500).json({ detail: error.message });
//     }
// }

// module.exports = CalendarPostEventController;
