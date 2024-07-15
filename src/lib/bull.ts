import Queue from "bull";

const videoQueue = new Queue("video transcoding", "redis://localhost:6379");

videoQueue.process(function (job, done) {
  // job.data contains the custom data passed when the job was created
  // job.id contains id of this job.
  console.log(job.data);

  // transcode video asynchronously and report progress
  job.progress(42);

  // call done when finished
  done();
});

videoQueue.add({ video: "http://example.com/video1.mov" });

export default videoQueue;