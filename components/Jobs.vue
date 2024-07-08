<script>
export default {
    data(){
        return{
            jobs:[
                {
                    id: '4',
                    Company: "Cognizant",
                    selectStr: "#Cognizant",
                    Positions: [
                        {
                        id: '43',
                        Title: "Technical Principal",
                        Responsibilities: "Managing technial understanding and deliverable between client and engineering team. Ensuring contractual obligations are fulfilled within the agreed upon time and quality. Creating personalized training manuals for engineering teams for team specific cases. Training junior Technical Principals in client management. Building out CCoE based on AWS Well architected Framework, decreased cloud spending, increased and visualized security posture of AWS Accounts, Architecture and Software.",
                        StartDate: "October 2023",
                        EndDate: "present"
                        },
                        {
                        id: '42',
                        Title: "Software Engineering Manager",
                        Responsibilities: "Creating Value Stream Maps to identify waste and decrease development time by up to 20%. Train Engineering Teams on best cloud practices and architectural desicion making to decrease cloud spending , increase security posture and following general and specific best practices.",
                        StartDate: "September 2022",
                        EndDate: "November 2022"
                        },
                        {
                        id: '41',
                        Title: "Lead Consultant",
                        Responsibilities: "Wrote DO178C complaint Terraform IaC in AWS to for remote Pilots to communicate with unmanned aerial vehicles. Trained Engineering Team on Terraform industry best practices and CI/CD Implementations. Developed and implemented one-click IaC solution to accelerate cloud adoption by 50%. Wrote HIPPA compliant serverless Cloudformation IaC and business logic in Python for Healthcare customers to solve crossstate plan coverage.",
                        StartDate: "January 2021",
                        EndDate: "September 2022"
                        }
                    ]
                },
                {
                    id: '3',
                    Company: "Berkadia",
                    selectStr: "#Berkadia",
                    Positions: [
                        {
                        id: '31',
                        Title: "SRE",
                        Responsibilities: "Build Serverless Application for Mortgage Brokers to submit Property Data for commercial real estate developments. Accelerated deal-closing time by 300%",
                        StartDate: "May 2020",
                        EndDate: "December 2020"
                        },
                        {
                        id: '32',
                        Title: "DevOps Engineer",
                        Responsibilities: "Supporting, driving and reviewing Change Management and Implementation. Resolving Deployment issues in production on Windows Servers with Powershell.",
                        StartDate: "June 2018",
                        EndDate: "May 2020"
                    }
                    ]
                },
                {
                    id: '2',
                    Company: "Cloudmine",
                    selectStr: "#Cloudmine",
                    Positions: [
                        {
                        id: '21',
                        Title: "SRE",
                        Responsibilities: "Maintained and improved HIPAA compliant AWS Software with focus on high availability, and self-healing rapid failover processes. Increased resiliency and overall operating model",
                        StartDate: "April 2017",
                        EndDate: "April 2018"
                        }
                    ]
                },
                {
                    id: '1',
                    Company: "PointIO",
                    selectStr: "#PointIO",
                    Positions: [
                        {
                        id: '11',
                        Title: "DevOps Engineer",
                        Responsibilities: "Build 1-click CI/CD Pipeline allowing globally distributed Engineers to deploy changes reliable into Development environments including rollback strategies. Decreasing deployment time from 24hours to 20min.",
                        StartDate: "Deember 2014",
                        EndDate: "March 2017"
                        }
                    ]
                }
            ]
        }
    }
}

</script>
<template>
    <div v-for='job in jobs' :key='jobs.id'>
        <p>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" :data-bs-target=job.selectStr  aria-expanded="false" aria-controls="collapseExample">
                {{ job.Company }}
            </button>
        </p>
        <div class="collapse" :id=job.Company>
            <!-- <div class="card card-body"> -->
                <div v-for='position in job.Positions' :key='position.id'>
                <div class="card card-body">
                <p>
                    <h5>{{ position.Title }}</h5>
                    <p><small>Started: {{ position.StartDate }} Finished: {{ position.EndDate }}</small></p>
                    <p>{{ position.Responsibilities }}</p>
                </p>
                </div>
            </div>
        </div>
    </div>
</template>
