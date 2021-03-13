import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'multi-select',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {
 
  @Input() options: any;
  @Input() filter: any;
  @Input() filterBy: any;

  @Output() onChange = new EventEmitter<any>();

  expanded: boolean = false;
  searchVal = '';
  selectedItems = new Array();
  tokenCards = new Array();
  tokenClosed: boolean = false;
  isFiltered: boolean = false;

  constructor(

  ) { }

  ngOnInit(): void {
    //to display the token card on the load, if any value sent in filterby
    if (this.options && this.filter && this.filterBy) {
      for (let i = 0; i < this.options.length; i++) {
        let target: string = this.options[i].value;
        let filterId = this.filterBy.split(",")
        let filter: string = filterId[1].trim();
        if (target === filter) {
          this.tokenCards.push(this.options[i].label);
        }
       
      }
    }
  }

  filterItems() {
    //running for first instance on dropdown click if filterBy is provided
    if (!this.isFiltered) {
      if (this.filter) {
        let filterId = this.filterBy.split(",")
        let filter: string = filterId[1].trim();
        let checkboxes: any = document.getElementsByClassName("inputData");
        for (let i = 0; i < this.options.length; i++) {
          //making checkbox checked and applying stylings to the filtered value
          let target: string = this.options[i].value;
          if (target === filter) {
            for (let a = 0; a < checkboxes.length; a++) {
              //making checkbox checked and applying stylings to the filtered value
              if (checkboxes[a].value == filter) {
                checkboxes[a].checked = true;

                const labelId: string = "itemLabel"+ i ;
                const label: any = document.getElementById(labelId);
                label.style.backgroundColor = "#b8e8fc"

                //pushing selected value to array of selected ones
                if (this.selectedItems.length == 0) {
                  this.selectedItems.push(this.options[i].value);
                  console.log(this.options[i].value)
                }
                 //pushing selected value to array of display cards
                if (this.tokenCards.length == 0) {
                  this.tokenCards.push(this.options[i].label);
                }
              }
            }
          }
        }
      }
      this.isFiltered = true;
    }
  }

  showCheckboxes(event: any) {
    //to display and hide multiselect dropdown based on user action
    let checkboxes = document.getElementById("checkboxes");
    if (!this.expanded) {
      checkboxes ? checkboxes.style.display = "block" : "";
      this.expanded = true;
    } else {
      checkboxes ? checkboxes.style.display = "none" : "";
      this.expanded = false;
    }
  }

  searchFunction(event: any) {
    let input: any;
    let filter: any;
    let checkboxes: any;
    let label: any;
    input = event.target.value.toUpperCase();
    filter = event.target.value.toUpperCase();
    checkboxes = document.getElementById("checkboxes");
    label = checkboxes.getElementsByTagName("label")
    let finalArray = [];
    for (let i = 0; i < label.length; i++) {
      let item = label[i].innerText;
      //if label present changing style to display
      if (item.toUpperCase().indexOf(filter) > -1) {
        label[i].style.display = "";
      } else {
        label[i].style.display = "none";
      }
    }
  }

  onSelected(event: any) {
    // adding and removing in selected items and token cards based on selection
    if (event.target.checked) {
      let item: string = event.target.value;
      let token: string = event.target.labels[0].innerText;
      this.selectedItems.push(item)
      this.tokenCards.push(token)
      // adding styling to selected dropdown
      event.target.labels[0].style.backgroundColor = "#b8e8fc";
    }
    if (!event.target.checked) {
      //removing styling to unselected dropdown
      event.target.labels[0].style.backgroundColor = "";
      let item: string = event.target.value;
      let token: string = event.target.labels[0].innerText;
      const index = this.selectedItems.indexOf(item, 0);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      }
      const tokenIndex = this.tokenCards.indexOf(token, 0);
      if (tokenIndex > -1) {
        this.tokenCards.splice(tokenIndex, 1);
      }
    }

    //sending values to parent component
    let obj = { value: '' }
    obj.value = this.selectedItems.join();
    this.onChange.emit(obj)


  }

  onClose(event: any) {
    //hiding on click of X icon
    let checkboxes = document.getElementById("checkboxes");
    if (this.expanded) {
      checkboxes ? checkboxes.style.display = "none" : "";
      this.expanded = false;
    }
  }

  onTokenClose(event: any) {
    //hiding on click of X icon in cards
    let item: any = event.path[1].innerText;

    let tokenCards = document.getElementById(event.path[1].id)
    tokenCards ? tokenCards.style.display = "none" : "";
    
    this.removeItem(item)



  }

  removeItem(label: string) {
    //removing selected value from token card and selected value array on click of token card close

    let filter: string = label;
    let checkboxes: any = document.getElementsByClassName("inputData");

    for (let i = 0; i < this.options.length; i++) {
      let target: string = this.options[i].label;
      if (target === filter) {
        for (let a = 0; a < checkboxes.length; a++) {

          if (checkboxes[a].name == filter) {

            checkboxes[a].checked = false;
            let selectedItem: string = checkboxes[a].value;
            let tokenItem: string = label;
            const labelId: string = "itemLabel"+ i ;
             //removing styling for unselected value
                const labelTag: any = document.getElementById(labelId);
                labelTag.style.backgroundColor = ""
                //removing from selected item
            const index = this.selectedItems.indexOf(selectedItem, 0);
            if (index > -1) {
              this.selectedItems.splice(index, 1);
            }
            //removing from token card
            const tokenIndex = this.tokenCards.indexOf(tokenItem, 0);
            if (tokenIndex > -1) {
              this.tokenCards.splice(tokenIndex, 1);
            }
          }
        }
      }
    }

    //sending values to parent component
     let obj = { value: '' }
    obj.value = this.selectedItems.join();
    this.onChange.emit(obj)

  }


}
