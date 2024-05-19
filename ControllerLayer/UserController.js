router = require('express').Router();
trycatch = require('../utils/tryCatch');

serviceInitializer = require('../ServiceLayer/UserService');

const NoExtraInfoProvidedException = require('../Errors/NoExtraInfoProvidedException');
const NoCertificationProvidedException = require('../Errors/NoCertificationProvidedException');
const NoReviewProvidedException = require('../Errors/NoReviewProvidedException');

serviceInitializer().then((service) => {
    // BASIC INFO
    router.get('/Provider/basicInfo', trycatch(async (req, res, next) => {
        res.status(200).json(await service.getBasicInfoProvider(req.dbId));
    }));

    router.get('/Employer/basicInfo', trycatch(async (req, res, next) => {
        res.status(200).json(await service.getBasicInfoEmployer(req.dbId));
    }));


    // EXTRA INFO
    router.get("/Provider/extraInfo", trycatch(async (req, res, next) => {
        res.status(200).json(await service.getExtraInfoProvider(req.dbId));
    }));

    router.post("/Provider/extraInfo", trycatch(async (req, res, next) => {
        if (!req.extraInfo)
            throw new NoExtraInfoProvidedException();

        await service.addExtraInfoProvider(req.dbId, req.extraInfo);
        res.status(201).send();
    }));

    
    // CERTIFICATIONS
    router.get("/Provider/certifications", trycatch(async (req, res, next) => {
        res.status(200).json(await service.getCertificationsProvider(req.dbId));
    }));

    router.post("/Provider/certifications", trycatch(async (req, res, next) => {
        if (!req.certification)
            throw new NoCertificationProvidedException();

        await service.addCertificationProvider(req.dbId, req.certification);
        res.status(201).send();
    }));


    // REVIEWS
    router.get("/Provider/reviews", trycatch(async (req, res, next) => {
        res.status(200).json(await service.getReviewsProvider(req.dbId));
    }));

    router.get("/Employer/reviews", trycatch(async (req, res, next) => {
        res.status(200).json(await service.getReviewsEmployer(req.dbId));
    }));

    router.post("/Provider/reviews", trycatch(async (req, res, next) => {
        if (!req.review)
            throw new NoReviewProvidedException();

        await service.addReviewProvider(req.dbId, req.review);
        res.status(201).send();
    }));

    router.post("/Employer/reviews", trycatch(async (req, res, next) => {
        if (!req.review)
            throw new NoReviewProvidedException();

        await service.addReviewEmployer(req.dbId, req.review);
        res.status(201).send();
    }));


    // SERVICES
    router.get("/Provider/postulatedServices", trycatch(async (req, res, next) => {
        res.status(200).json(await service.getJoinedOfferingsProvider(req.dbId));
    }));

    router.get("/Employer/publishedServices", trycatch(async (req, res, next) => {
        res.status(200).json(await service.getMadeOfferingsEmployer(req.dbId));
    }));
});

module.exports = router;