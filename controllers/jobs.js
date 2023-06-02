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
    req.body.createdBy = req.user.userId
    // console.log(req.body.createdBy)
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}


const updateJob = async (req, res) => {
    res.send('update job')
}


const deleteJob = async (req, res) => {
    res.send('delete job')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    
}