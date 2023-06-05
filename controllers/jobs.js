const Job = require('../models/job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')



const getAllJobs = async (req, res) => {
    // this looks for all jobs asociated with the UserId

    const jobs = await Job.find({createdBy: req.user.userId}).sort('CreatedAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

// const getJobs = async (req, res) => {
//     const {user:{userId}, params:{id:jobId}} = req
//     const job = await Job.findOne({
//         _id:jobId, createdBy:userId
//     })

//     if(!job) {
//         throw new NotFoundError(`No job with id ${jobId}`)
//     }
//     res.status(StatusCodes.OK).json({ job })
// }


// another way to write the code above
// code allows a user to get a particular job linked to an ID

const getJob = async (req, res) => {

    const jobId = req.params.id;
    const userId = req.user.userId;

    const job = await Job.findOne({
        _id:jobId, createdBy:userId
    })

    if(!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    // we created a new 'createdBy' property because its on our Schema Model.

    req.body.createdBy = req.user.userId
    // console.log(req.body.createdBy)
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}


const updateJob = async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user.UserId;
    const { company, position } = req.body;

    if(company === '' || position === '') {
        throw new BadRequestError('fields cannot be empty')
    }
    const job = await Job.findByIdAndUpdate({_id:jobId, createdBy:userId}, req.body, {new:true, runValidators:true})

    if(!job) {
        throw new BadRequestError(`No Job with the ID ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job })
}


const deleteJob = async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user.UserId;

    const job = await Job.findByIdAndDelete({_id:jobId, createdBy:userId})

    if(!job) {
        throw new BadRequestError(`No Job with the ID ${jobId}`)

    }
    res.status(StatusCodes.OK).json({job, msg: 'Job Deleted' })
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    
}