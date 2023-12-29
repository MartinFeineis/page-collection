<template>
<form action="" method="get" class="form-example">
  <div class="form-example">
    <label for="name">Requested for: </label>
    <input type="text" name="name" id="name" required />
  </div>
  <div class="form-example">
    <label for="email">Is this for an existing VPC?: </label>
    <label><input type="radio" name="radio" value="yes" /> Yes</label>
    <label><input type="radio" name="radio" value="no" /> No</label>
  </div>
  <div>
    <select name="vpcregion" id="pet-select">
      <option value="">Please an AWS region</option>
      <option value="us-east-1">us-east-1</option>
      <option value="us-east-2">us-east-2</option>
      <option value="us-west-1">us-west-1</option>
      <option value="us-west-2">us-west-2</option>
      <option value="eu-central-1">eu-central-1</option>
      <option value="eu-west-1">eu-west-1</option>
    </select>
  </div>
  <div class="form-example">
    <input type="submit" value="Subscribe!" />
  </div>
</form>

</template>
