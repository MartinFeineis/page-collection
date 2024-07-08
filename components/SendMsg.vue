<script>
export default {
    data(){
        return{
            showTo: false,
            showFrom: true,
            showMsg: true,
            sender: '',
            recipient: 'ich',
            message: '',
            sentMsgId: 0
        }
    },
    props: {
        to: {
            type: String,
            default: 'personalWebsite'
        },
        from:{
            type: String,
            default: 'anonymous'
        },
        readId: {
            type: Number
        }
    },
    methods: {
        async uploadMessage(){
          var msgBody = { "Sender": this.sender, "Recipient": this.recipient, "Message": this.message };
          var url = "https://api.404founders.com/send";
          const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(msgBody)
          })
          const data = await res.json()
          this.sentMsgId = data.MsgId
          console.log(this.msgIds)
        }
    }
}
</script>
<template>
<p>
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Contact Me
  </button>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
    <form @submit.prevent="uploadMessage">
    <div v-show="showFrom" class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">From:
      </span>
      <input v-model="sender" type="text" class="form-control" placeholder="Sender" aria-label="Sender" aria-describedby="basic-addon1">
    </div>
    <div v-show="showTo" class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">To:
      </span>
      <input v-model="recipient" type="text" class="form-control" placeholder="Recipient" aria-label="Recipient" aria-describedby="basic-addon1">
    </div>
    <div v-show="showMsg" class="input-group">
      <span class="input-group-text">Message
      </span>
      <textarea v-model="message" class="form-control" aria-label="With textarea">
      </textarea>
    </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div v-show="sentMsgId != 0">
      <p>Your message Id is: {{  sentMsgId }}</p>
    </div>
  </div>
</div>
</template>
