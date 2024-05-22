router = require('express').Router();
trycatch = require('../utils/tryCatch');

serviceInitializer = require('../ServiceLayer/UserService');

const NoExtraInfoProvidedException = require('../Errors/NoExtraInfoProvidedException');
const NoCertificationProvidedException = require('../Errors/NoCertificationProvidedException');
const NoReviewProvidedException = require('../Errors/NoReviewProvidedException');

serviceInitializer().then((service) => {
    // BASIC INFO
    router.get('/Provider/basicInfo', trycatch(async (req, res, next) => {
        res.status(200).json(await service.getBasicInfoProvider(req.body.dbId));
    }));

    router.put('/Provider/basicInfo', trycatch(async (req, res, next) => {
        await service.updateBasicInfoProvider(req.body.dbId, req.body.infoToUpdate);
        res.status(200).send();
    }));

    router.get('/Employer/basicInfo', trycatch(async (req, res, next) => {
        res.status(200).json(await service.getBasicInfoEmployer(req.body.dbId));
    }));

    router.put('/Employer/basicInfo', trycatch(async (req, res, next) => {
        await service.updateBasicInfoEmployer(req.body.dbId, req.body.infoToUpdate);
        res.status(200).send();
    }));

    


    // EXTRA INFO
    router.get("/Provider/extraInfo", trycatch(async (req, res, next) => {
        res.status(200).json(await service.getExtraInfoProvider(req.body.dbId));
    }));

    router.post("/Provider/extraInfo", trycatch(async (req, res, next) => {
        if (!req.body.extraInfo)
            throw new NoExtraInfoProvidedException();

        await service.addExtraInfoProvider(req.body.dbId, req.body.extraInfo);
        res.status(201).send();
    }));

    router.put('/Provider/extraInfo', trycatch(async (req, res, next) => {
        await service.updateExtraInfoProvider(req.body.dbId, req.body.infoToUpdate);
        res.status(200).send();
    }));

    router.put('/Provider/delete/extraInfo', trycatch(async (req, res, next) => {
        await service.deleteExtraInfoProvider(req.body.dbId, req.body.info_id);
        res.status(200).send();
    }));

    
    // CERTIFICATIONS
    router.get("/Provider/certifications", trycatch(async (req, res, next) => {
        res.status(200).json(await service.getCertificationsProvider(req.body.dbId));
    }));

    router.post("/Provider/certifications", trycatch(async (req, res, next) => {
        if (!req.body.certification)
            throw new NoCertificationProvidedException();

        await service.addCertificationProvider(req.body.dbId, req.body.certification);
        res.status(201).send();
    }));


    // REVIEWS
    router.get("/Provider/reviews", trycatch(async (req, res, next) => {
        res.status(200).json(await service.getReviewsProvider(req.body.dbId));
    }));

    router.get("/Employer/reviews", trycatch(async (req, res, next) => {
        res.status(200).json(await service.getReviewsEmployer(req.body.dbId));
    }));

    router.post("/Provider/reviews", trycatch(async (req, res, next) => {
        if (!req.body.review)
            throw new NoReviewProvidedException();

        await service.addReviewProvider(req.body.dbId, req.body.review);
        res.status(201).send();
    }));

    router.post("/Employer/reviews", trycatch(async (req, res, next) => {
        if (!req.body.review)
            throw new NoReviewProvidedException();

        await service.addReviewEmployer(req.body.dbId, req.body.review);
        res.status(201).send();
    }));


    // SERVICES
    router.get("/Provider/postulatedServices", trycatch(async (req, res, next) => {
        res.status(200).json(await service.getJoinedOfferingsProvider(req.body.dbId));
    }));

    router.get("/Employer/publishedServices", trycatch(async (req, res, next) => {
        res.status(200).json(await service.getMadeOfferingsEmployer(req.body.dbId));
    }));
});

module.exports = router;