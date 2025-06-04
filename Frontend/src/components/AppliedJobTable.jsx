
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import store from '@/redux/store'

const AppliedJobTable = () => {

  const { allAppliedJobs } = useSelector(store => store.job);

  return (
    <div>
      <Table>
        <TableCaption>A List of Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            // [1,2].map((item,index)=>(
            //      <TableRow key={index} >
            //     <TableCell>20-05-2025</TableCell>
            //     <TableCell>Frontend Developer</TableCell>
            //     <TableCell>Google</TableCell>
            //     <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
            //   </TableRow>
            // ))



            //Dynamically:-
            allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob?._id} >
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company?.name}</TableCell>

                <TableCell className="text-right">
                  {/* <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-700' : appliedJob.status === "pending" ? 'bg-gray-700' : 'bg-green-700' }`}>{appliedJob.status}</Badge> */}
                  <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-700' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-blue-700'}`}>{appliedJob.status.toUpperCase()}</Badge>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>

      </Table>
    </div>
  )
}

export default AppliedJobTable
