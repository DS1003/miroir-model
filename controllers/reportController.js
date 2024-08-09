const Report = require('../models/report');
const User = require('../models/user');
const Post = require('../models/post');

exports.reportUser = async (req, res) => {
    const { reporterId, reportedUserId, reason } = req.body;

    try {
        const reporter = await User.findById(reporterId);
        const reportedUser = await User.findById(reportedUserId);

        if (!reporter || !reportedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const newReport = new Report({
            reporter: reporterId,
            reportedUser: reportedUserId,
            reason
        });

        await newReport.save();

        res.status(201).json({ message: 'Utilisateur signalé avec succès', report: newReport });
    } catch (error) {
        console.error('Erreur lors du signalement de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};
exports.reportPost = async (req, res) => {
    const { reporterId, postId, reason } = req.body;

    try {
        const reporter = await User.findById(reporterId);
        const post = await Post.findById(postId);

        if (!reporter || !post) {
            return res.status(404).json({ message: 'Utilisateur ou Post non trouvé' });
        }

        const newReport = new Report({
            reporter: reporterId,
            post: postId,
            reason
        });

        await newReport.save();

        res.status(201).json({ message: 'Post signalé avec succès', report: newReport });
    } catch (error) {
        console.error('Erreur lors du signalement du post:', error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};
exports.reportComment = async (req, res) => {
    const { reporterId, commentId, postId, reason } = req.body;

    try {
        const reporter = await User.findById(reporterId);
        const post = await Post.findById(postId);
        const comment = post.comments.id(commentId);

        if (!reporter || !comment) {
            return res.status(404).json({ message: 'Utilisateur ou Commentaire non trouvé' });
        }

        const newReport = new Report({
            reporter: reporterId,
            comment: commentId,
            reason
        });

        await newReport.save();

        res.status(201).json({ message: 'Commentaire signalé avec succès', report: newReport });
    } catch (error) {
        console.error('Erreur lors du signalement du commentaire:', error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};
exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find()
            .populate('reporter', 'nom prenom email')
            .populate('reportedUser', 'nom prenom email')
            .populate('post');
        res.status(200).json(reports);
    } catch (error) {
        console.error('Erreur lors de la récupération des signalements:', error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};
exports.resolveReport = async (req, res) => {
    const { reportId, status } = req.body;

    try {
        const report = await Report.findById(reportId);

        if (!report) {
            return res.status(404).json({ message: 'Signalement non trouvé' });
        }

        report.status = status;
        await report.save();

        res.status(200).json({ message: 'Signalement mis à jour avec succès', report });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du signalement:', error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

