<template>
  <div class="container max-w-5xl p-4 mx-auto">
    <div class="text-center">Account ID: {{ id }}</div>

    <div class="border card">
      <div class="card-body">
        <div class="card-title">Transactions</div>

        <div>
          <!-- Mobile transaction list -->
          <div class="space-y-2 sm:hidden">
            <div class="px-4 py-2 space-y-2 border rounded-lg">
              <!-- Name & amount -->
              <div class="flex items-start justify-between">
                <div class="text-sm font-semibold">Mortgage payment</div>
                <div class="text-lg font-bold">-1531.24</div>
              </div>

              <!-- Date & category -->
              <div class="flex items-center justify-between">
                <div class="text-sm badge badge-secondary">Housing</div>
                <div class="text-sm">2024/05/01</div>
              </div>
            </div>

            <div class="px-4 py-2 space-y-2 border rounded-lg">
              <!-- Name & amount -->
              <div class="flex items-start justify-between">
                <div class="text-sm font-semibold">IHDA Down Payment Assistance</div>
                <div class="text-lg font-bold">-83.33</div>
              </div>

              <!-- Date & category -->
              <div class="flex items-center justify-between">
                <div class="text-sm badge badge-secondary">Housing</div>
                <div class="text-sm">2024/05/01</div>
              </div>
            </div>
          </div>

          <!-- Non-mobile Transaction list -->
          <div class="hidden overflow-x-auto sm:block">
            <table class="table table-zebra">
              <!-- Table header -->
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>

              <!-- Table body -->
              <tbody>
                <tr>
                  <th>Housing</th>
                  <th>2024/05/01</th>
                  <th>Mortgage payment</th>
                  <th class="text-right">-1531.24</th>
                </tr>
                <tr>
                  <th>Housing</th>
                  <th>2024/05/01</th>
                  <th>IHDA Down Payment Assistance</th>
                  <th class="text-right">-83.33</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: String
});
</script>

<style scoped></style>
