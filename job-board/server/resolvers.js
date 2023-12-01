// Resolvers define the technique for fetching the types defined in the

import { getJob, getJobs, getCompany, getJobsByCompany } from "./db/jobs.js";

export const resolvers = {
  Query: {
    company: (_root, { id }) => getCompany(id),
    jobs: () => getJobs(),
    job: (_root, id) => getJob(id),
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },

  Job: {
    company: (job) => getCompany(job.companyId),
    date: (job) => toIsoDate(job.createdAt),
  },
};

function toIsoDate(val) {
  return val.slice(0, "yyyy-mm-dd".length);
}
