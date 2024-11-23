import { nanoid } from "nanoid";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customError.js";
import Job from "../models/JobModel.js";
import day from "dayjs"
import mongoose from "mongoose";


// let jobs = [
//     { id: nanoid(), company: 'apple', position: 'front-end' },
//     { id: nanoid(), company: 'google', position: 'back-end' },
//   ];

 const getAllJobs = async (req , res) => {
  const {search , jobStatus , jobType , sort} = req.query;

    const queryObject = {
      createdBy : req.user.userId
    }
    if(search){
      queryObject.$or = [
        {position : {$regex : search , $options : 'i'}},
        {company : {$regex : search , $options : 'i'}},

      ]
    }

    if(jobStatus && jobStatus != 'all'){
      queryObject.jobStatus = jobStatus;
    }
    if(jobType && jobType != 'all'){
      queryObject.jobType = jobType;
    }

    const sortOption = {
      newest : '-createdAt',
      oldest : 'createdAt',
      'a-z' : 'position',
      'z-a' : '-position'
    }
    const sortKey = sortOption[sort]  || sortOption.newest

    // Setup Pagination 
    const page= Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit;


  
    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);

    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);
    
    res.status(StatusCodes.OK).json({totalJobs , numOfPages ,  currentPage : page  , jobs });
  };
// Create a Job
const createJob = async (req , res)=>{
    req.body.createdBy = req.user.userId
    console.log(req.body.createdBy);
    
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
  
  }


const getJob = async (req, res) => {
    const { id } = req.params;
   const job =  await Job.findById(id);
    res.status(200).json({ job });
  }


const updateJob = async (req, res) => {
   
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id , req.body , {new : true})
    res.status(200).json({ msg: 'job modified', job : updatedJob });
  }


const deleteJob = async (req, res) => {
    const { id } = req.params;
    const removedJob = await Job.findByIdAndDelete(id)  
    res.status(200).json({ msg: 'job deleted' , job : removedJob });
  }


  const showStats = async (req , res)=>{
    let stats = await Job.aggregate([
      {$match : {createdBy : new mongoose.Types.ObjectId(req.user.userId)}},
      {$group : {_id : '$jobStatus' , count : {$sum : 1}}},

    ])

    stats = stats.reduce((acc , curr)=>{
      const {_id : title , count} = curr
      acc[title] = count
      return acc;

    } , {})
    
    const defaultStats = {
      Pending : stats.Pending || 0,
      Interview : stats.Interview  || 0,
      Declined : stats.Declined || 0
    }

    let monthlyApplication = await Job.aggregate([
       {$match : {createdBy : new mongoose.Types.ObjectId(req.user.userId)}},
       {$group : {_id : {year : {$year : '$createdAt'} , month : {$month : "$createdAt"}}  , count : {$sum : 1}} },
       {$sort : {"_id.year" : -1 , '_id.month' : -1}},
       {$limit : 6}
    ])

    monthlyApplication = monthlyApplication.map((item)=>{
      const {_id : {year , month} , count} = item;
      const date = day().month(month -1).year(year).format('MMM YY')
      return {date ,count}
    }).reverse()


    // let monthlyApplication = [
    //   {
    //   date : 'May 23',
    //   count : 12
    //   },
    //   {
    //     date : 'June 23',
    //     count : 10
    //     },
    //     {
    //       date : 'July 23',
    //       count : 1
    //       },


    // ]

    res.status(StatusCodes.OK).json({defaultStats , monthlyApplication})
  }
export {getAllJobs , createJob , getJob , updateJob , deleteJob , showStats}