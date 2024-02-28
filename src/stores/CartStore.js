import { defineStore } from "pinia";
import { groupBy } from "lodash";
import { useAuthStore } from "@/stores/AuthUserStore";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: []
        };
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,
        grouped: (state) => {
            const grouped = groupBy(state.items, item => item.name)
            const sortet = Object.keys(grouped).sort()
            let inOrder = {}
            sortet.forEach(key => {
                inOrder[key] = grouped[key]
            })
            return inOrder
        },
        groupCount: (state) => (name) => state.grouped[name].length,
        total: (state) => state.items.reduce((p, c) => p + c.price, 0),
    },
    actions: {
        checkout() {
            const authUserStore = useAuthStore();
            alert(`${authUserStore.username} just bought ${this.count} items for a total of $${this.total}!`);
        },
        addItems(count, item) {
            count = parseInt(count);
            for (let i = 0; i < count; i++) {
                this.items.push({ ...item });
            }
        },
        clearItem(itemName) {
            this.items = this.items.filter((item) => item.name !== itemName);
        },
        setItemCount(item, count) {
            this.clearItem(item.name);
            this.addItems(count, item);
        }
    }
})
