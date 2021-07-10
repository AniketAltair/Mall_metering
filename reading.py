import pandas as pd
from datetime import timedelta, date
from numpy import random
def daterange(date1, date2):
    for n in range(int ((date2 - date1).days)+1):
        yield date1 + timedelta(n)



def generatereadings(start_dt, end_dt):
    date_list=daterange(start_dt,end_dt)
    df= pd.DataFrame(date_list, columns=['timestamp'])
    reading_list=[]
    variation= [-8,-7,-6,-5,4,-3,-2,-1,0,1,2,3,4,5,6,7]
    for i in range(0,len(df)):
        base_reading=i*10
        x=random.choice(variation)
        reading=base_reading+x
        reading_list.append(reading)
    df['reading']=reading_list
    return df

if __name__ == '__main__':
    start_date=date(2021,6,1)
    end_date=date(2021,7,2) 
    # print(f"generating data for dates , from {start_date} to {end_date}")
    # #//df = generatereadings(start_date, end_date)
    # print(f"generated")
    # df['unit']='W'
    # df[['timestamp','reading']].to_csv("meter_reading.csv")
    # print("saved reading data")
    list= daterange(start_date,end_date)
    for n in list:
        print(f"'{n}',")
    


